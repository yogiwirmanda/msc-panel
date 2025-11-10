<template>
  <Toast />
  <ConfirmDialog />

  <Card>
    <template #title>
      <div class="flex justify-between">
        <div>List Role</div>
        <div>
          <Button asChild v-slot="slotProps">
            <RouterLink to="/admin/master/role/create" :class="slotProps.class">
              Add Role
            </RouterLink>
          </Button>
        </div>
      </div>
    </template>

    <template #content>
      <div class="mt-5 relative">
        <DataTable
          :value="roleStore.roles"
          :lazy="true"
          paginator
          :rows="roleStore.pageSize"
          :totalRecords="roleStore.total"
          :first="(roleStore.page - 1) * roleStore.pageSize"
          @page="onPage"
          tableStyle="min-width: 50rem"
        >
          <Column header="No" style="width: 5%; text-align: center">
            <template #body="slotProps">
              {{
                (roleStore.page - 1) * roleStore.pageSize + slotProps.index + 1
              }}
            </template>
          </Column>

          <Column field="role" header="Nama Role" style="width: 25%" />

          <Column header="Actions" style="width: 20%; text-align: center">
            <template #body="slotProps">
              <div class="flex justify-center gap-2">
                <Button
                  severity="info"
                  rounded
                  @click="editRow(slotProps.data)"
                >
                  <PencilIcon class="w-5 h-5" />
                  <span>Edit</span>
                </Button>
                <Button
                  severity="danger"
                  rounded
                  @click="deleteRow(slotProps.data)"
                >
                  <TrashIcon class="w-5 h-5" />
                  <span>Delete</span>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>

        <transition name="fade">
          <div
            v-if="roleStore.loading"
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
import { onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { useConfirm } from "primevue/useconfirm";
import Card from "primevue/card";
import { useRoleStore } from "../../../../stores/roleStore";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { useToast } from "primevue/usetoast";
const confirm = useConfirm();
const toast = useToast();
const roleStore = useRoleStore();

const fetchData = async () => {
  await roleStore.fetchRoles(1);
};

const onPage = (event: any) => {
  const newPage = event.page + 1;
  roleStore.fetchRoles(newPage);
};

onMounted(() => {
  fetchData();
});

const editRow = (row: { id: number; role: string }) => {
  toast.add({
    severity: "info",
    summary: "Edit",
    detail: `Editing ${row.role}`,
    life: 2000,
  });
};

const deleteRow = (row: { id: number; role: string }) => {
  confirm.require({
    message: `Are you sure you want to delete ${row.role}?`,
    header: "Confirm",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await roleStore.deleteRole(Number(row));
        await roleStore.fetchRoles(roleStore.page);
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
