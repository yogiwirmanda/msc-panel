<template>
  <Toast />
  <ConfirmDialog />

  <Card>
    <template #title>
      <div class="flex justify-between">
        <div>List Member</div>
      </div>
    </template>

    <template #content>
      <div class="mt-5 relative">
        <DataTable
          :value="userStore.members"
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

          <Column field="name" header="Name" style="width: 20%" />
          <Column
            field="phone_number"
            header="Phone Number"
            style="width: 15%"
          />
          <Column field="email" header="E-mail" style="width: 10%" />
          <Column field="address" header="Address" style="width: 25%" />
          <Column field="birthdate" header="Birthdate" style="width: 40%" />
          <Column field="gender" header="Gender" style="width: 25%" />
          <Column field="profession" header="Profession" style="width: 25%" />
          <Column
            field="last_education"
            header="Education"
            style="width: 25%"
          />

          <!-- <Column header="Actions" style="width: 20%; text-align: center">
            <template #body="slotProps">
              <div class="flex justify-center gap-2">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  label="Hapus"
                  rounded
                  @click="deleteRow(slotProps.data)"
                />
              </div>
            </template>
          </Column> -->
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
import { onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
// import { useToast } from "primevue/usetoast";
// import { useConfirm } from "primevue/useconfirm";
import Card from "primevue/card";
import { useUserStore } from "../../../stores/userStore";

// const toast = useToast();
// const confirm = useConfirm();

const userStore = useUserStore();

const fetchData = async () => {
  await userStore.fetchMembers(1);
};

const onPage = (event: any) => {
  const newPage = event.page + 1;
  userStore.fetchMembers(newPage);
};

onMounted(() => {
  fetchData();
});

// const deleteRow = (row: { id: number; nickname: string }) => {
//   confirm.require({
//     message: `Are you sure you want to delete ${row.nickname}?`,
//     header: "Confirm",
//     icon: "pi pi-exclamation-triangle",
//     accept: async () => {
//       try {
//         await userStore.deleteMember(Number(row.id));
//         await userStore.fetchMembers(userStore.page);
//         toast.add({
//           severity: "success",
//           summary: "Deleted",
//           detail: `${row.nickname} removed`,
//           life: 2000,
//         });
//       } catch (error) {
//         toast.add({
//           severity: "error",
//           summary: "Error",
//           detail: "Failed to delete role",
//           life: 2000,
//         });
//       }
//     },
//   });
// };
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
