<template>
  <Toast />
  <ConfirmDialog />

  <Card>
    <template #title>
      <div class="flex justify-between">
        <div>List Test</div>
        <div>
          <Button asChild v-slot="slotProps">
            <RouterLink to="/admin/master/test/create" :class="slotProps.class">
              Add Test
            </RouterLink>
          </Button>
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-5 relative">
        <DataTable
          :value="listTest"
          :lazy="true"
          paginator
          :rows="userStore.pageSize"
          :totalRecords="userStore.total"
          :first="(userStore.page - 1) * userStore.pageSize"
          @page="onPage"
          tableStyle="min-width: 50rem"
        >
          <Column header="No" style="width: 5%; text-align: center">
            <template #body="slotProps">
              {{
                (userStore.page - 1) * userStore.pageSize + slotProps.index + 1
              }}
            </template>
          </Column>

          <Column field="name" header="Name" style="width: 25%" />
          <Column field="type" header="Type" style="width: 25%" />

          <Column header="Actions" style="width: 20%; text-align: center">
            <template #body="slotProps">
              <div class="flex justify-center gap-2">
                <Button
                  severity="info"
                  label="Add Question"
                  rounded
                  @click="editRow(slotProps.data)"
                >
                  <PencilIcon class="w-5 h-5" />
                  <span>Edit</span>
                </Button>
                <Button
                  severity="danger"
                  label="Hapus"
                  rounded
                  @click="deleteRow(slotProps.data)"
                >
                  <TrashIcon class="w-5 h-5" />
                  <span>Hapus</span>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>

        <transition name="fade">
          <div
            v-if="userStore.loading"
            class="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg"
          >
            <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="4"
            />
          </div>
        </transition>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Card from "primevue/card";
import { useUserStore } from "../../../../stores/userStore";
import { useRouter } from "vue-router";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

const listTest = ref([
  { name: "Pre Test", type: "pre" },
  { name: "Post Test", type: "post" },
]);

const userStore = useUserStore();

const fetchData = async () => {
  await userStore.fetchUsers(1);
};

const onPage = (event: any) => {
  const newPage = event.page + 1;
  userStore.fetchUsers(newPage);
};

onMounted(() => {
  fetchData();
});

const editRow = (item: any) => {
  router.push("/admin/master/test/question");
};

const deleteRow = (row: { id: number; role: string }) => {
  confirm.require({
    message: `Are you sure you want to delete ${row.role}?`,
    header: "Confirm",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await userStore.deleteUser(Number(row));
        await userStore.fetchUsers(userStore.page);
        toast.add({
          severity: "success",
          summary: "Deleted",
          detail: `${row.role} removed`,
          life: 2000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete role",
          life: 2000,
        });
      }
    },
  });
};
</script>

<style scoped>
.card {
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
