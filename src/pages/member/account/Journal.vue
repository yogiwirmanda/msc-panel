<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import MenuProfile from "../../../components/pages/account/MenuProfile.vue";
import HeaderProfile from "../../../components/pages/account/HeaderProfile.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

interface Journal {
  sesi: string;
  before: string;
  after_body_scan: string;
  after_self_break: string;
  new_learn: string;
}

const journals = ref<Journal[]>([
  {
    sesi: "1",
    before: "Gundah",
    after_body_scan: "Mengetahui titik lemah tubuh",
    after_self_break: "merasa lebih baik",
    new_learn: "Mengatur emosi",
  },
  {
    sesi: "2",
    before: "Gundah",
    after_body_scan: "Mengetahui titik lemah tubuh",
    after_self_break: "merasa lebih baik",
    new_learn: "Mengatur emosi",
  },
  {
    sesi: "3",
    before: "Gundah",
    after_body_scan: "Mengetahui titik lemah tubuh",
    after_self_break: "merasa lebih baik",
    new_learn: "Mengatur emosi",
  },
]);
</script>

<template>
  <div class="container pb-10">
    <div class="mb-5">
      <HeaderProfile />
    </div>
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-3">
        <MenuProfile />
      </div>
      <div class="col-span-9">
        <Card>
          <template #title>Journal List</template>
          <template #content>
            <DataTable
              :value="journals"
              paginator
              :rows="5"
              tableStyle="min-width: 40rem"
            >
              <Column field="sesi" header="Sesi Latihan"></Column>
              <Column field="before" header="Sebelum Latihan"></Column>
              <Column
                field="after_body_scan"
                header="Setelah Body Scan"
              ></Column>
              <Column
                field="after_self_break"
                header="Setelah Self break"
              ></Column>
              <Column
                field="new_learn"
                header="Hal Baru Yang Dipelajari"
              ></Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
