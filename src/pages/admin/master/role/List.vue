<template>
  <Toast />
  <ConfirmDialog />
  <Card>
    <template #title>
      <div class="flex justify-between">
        <div>List Role</div>
        <div>
          <Button asChild v-slot="slotProps">
            <RouterLink to="/admin/master/role/create" :class="slotProps.class"
              >Add Role</RouterLink
            >
          </Button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="mt-5">
        <DataTable
          :value="roles"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
        >
          <Column field="name" header="Nama Role" style="width: 25%" />

          <Column header="Actions" style="width: 20%; text-align: center">
            <template #body="slotProps">
              <div class="flex justify-center gap-2">
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  label="Edit"
                  rounded
                  @click="editRow(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  label="Hapus"
                  rounded
                  @click="deleteRow(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Card from "primevue/card";

const roles = ref([
  { id: 1, name: "Superadmin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "Operator" },
]);

const toast = useToast();
const confirm = useConfirm();

const editRow = (row: { id: number; name: string }) => {
  toast.add({
    severity: "info",
    summary: "Edit",
    detail: `Editing ${row.name}`,
    life: 2000,
  });
};

const deleteRow = (row: { id: number; name: string }) => {
  confirm.require({
    message: `Are you sure you want to delete ${row.name}?`,
    header: "Confirm",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      roles.value = roles.value.filter((item) => item.id !== row.id);
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: `${row.name} removed`,
        life: 2000,
      });
    },
  });
};
</script>

<style scoped>
.card {
  padding: 1rem;
}
</style>
