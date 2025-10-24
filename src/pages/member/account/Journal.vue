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

        <div class="grid grid-cols-2 gap-5">
          <Card class="card-journal" v-for="item in 2">
            <template #content>
              <div class="flex justify-between">
                <div class="text-lg font-bold">title {{ item }}</div>
                <div>20 Januari 2025</div>
              </div>
              <div class="mt-3">
                Hari ini aku merasa cukup tenang. Meskipun ada beberapa hal yang
                tidak berjalan sesuai rencana, aku mencoba untuk tetap bersyukur
                atas hal-hal kecil yang berjalan baik. Aku belajar bahwa tidak
                semua hal harus sempurna agar bisa membuatku bahagia.
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card-journal {
  margin-top: 20px;
  background-color: #dbdbdb47 !important;
  box-shadow: 8px 9px 6px 0px rgba(0, 0, 0, 0.1) !important;
}
</style>
