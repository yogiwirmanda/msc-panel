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

          <Column header="Actions" style="width: 20%; text-align: center">
            <template #body="slotProps">
              <div class="flex justify-center gap-2">
                <Button
                  severity="contrast"
                  label="Journal"
                  rounded
                  @click="ReportJournal(slotProps.data)"
                />
                <Button
                  severity="default"
                  label="Pre-Test"
                  rounded
                  @click="ReportPre(slotProps.data)"
                />
                <Button
                  severity="info"
                  label="Post-Test"
                  rounded
                  @click="ReportPost(slotProps.data)"
                />
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
import { onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Card from "primevue/card";
import { useUserStore } from "../../../stores/userStore";
import router from "../../../router";

const userStore = useUserStore();

const fetchData = async () => {
  await userStore.fetchMembers(1);
  console.log(userStore.members);
};

const onPage = (event: any) => {
  const newPage = event.page + 1;
  userStore.fetchMembers(newPage);
};

const ReportPre = (userId: any) => {
  router.push("/admin/report/test/pre/" + userId.id);
};

const ReportPost = (userId: any) => {
  router.push("/admin/report/test/pre/" + userId.id);
};

const ReportJournal = (userId: any) => {
  router.push("/admin/report/journal/" + userId.id);
};

onMounted(() => {
  fetchData();
});
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
