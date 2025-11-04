<template>
  <LoadingPage :visible="loading" message="Memproses Data...." />
  <Card v-if="data != null">
    <template #content>
      <div class="flex justify-center">
        <Image src="/images/logo.webp" />
      </div>
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-5">
          <Fieldset legend="Data Member" class="mt-5">
            <div class="grid grid-cols-1 gap-1">
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Name</div>
                <div class="col-span-8">{{ data?.member?.name }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Nickname</div>
                <div class="col-span-8">{{ data?.member?.nickname }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Birthdate</div>
                <div class="col-span-8">{{ data?.member?.birthdate }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Age</div>
                <div class="col-span-8">{{ data?.member?.age }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Email</div>
                <div class="col-span-8">{{ data?.member?.email }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Phone</div>
                <div class="col-span-8">{{ data?.member?.phone_number }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Address</div>
                <div class="col-span-8">{{ data?.member?.address }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Profession</div>
                <div class="col-span-8">{{ data?.member?.profession }}</div>
              </div>
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-4">Education</div>
                <div class="col-span-8">
                  {{ data?.member?.last_education }}
                </div>
              </div>
            </div>
          </Fieldset>
          <div class="mt-5">
            <Button
              as="a"
              class="mx-2"
              severity="danger"
              label="Kembali"
              href="/admin/report"
            />
            <Button
              class="mx-2"
              type="button"
              severity="info"
              label="Download Excel"
              @click="downloadReportExcel"
            />
          </div>
        </div>
        <div class="col-span-7">
          <Fieldset
            :legend="`Report ${router.currentRoute.value.params.type} Test`"
            class="mt-5 p-3"
          >
            <DataTable :value="reportTables">
              <Column field="category" header="Category" />
              <Column field="score_level" header="Level" />
              <Column field="total_questions" header="Total Question" />
              <Column field="total_score" header="Total Score" />
            </DataTable>
          </Fieldset>
        </div>
      </div>
    </template>
  </Card>
  <Card v-else>
    <template #content>
      <div class="flex justify-center">
        <Image src="/images/logo.webp" />
      </div>
      <Fieldset legend="Data Report" class="mt-5">
        <div class="flex justify-center items-center h-[200px]">
          <div class="text-2xl">Belum Ada Data</div>
        </div>
      </Fieldset>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from "primevue/card";
import { useRouter } from "vue-router";
import { useReportStore } from "../../../stores/report";
import { onMounted, ref } from "vue";
import Image from "primevue/image";
import Fieldset from "primevue/fieldset";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Cookie from "js-cookie";
import LoadingPage from "../../../components/LoadingPage.vue";

const router = useRouter();
const reportStore = useReportStore();
const data = ref<any>();
const reportTables = ref<any[]>([]);
const loading = ref(false);

const loadReport = async () => {
  loading.value = true;
  const success = await reportStore.test(
    String(router.currentRoute.value.params.type),
    Number(router.currentRoute.value.params.id)
  );

  if (success) {
    data.value = reportStore.reportData.data;
    reportTables.value = data.value.reportTables;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } else {
    data.value = null;
  }
};

const downloadReportExcel = async () => {
  try {
    const token = Cookie.get("token");
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        `api/v1/report/test/exportExcel?user_id=${Number(
          router.currentRoute.value.params.id
        )}&test_type=${String(router.currentRoute.value.params.type)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const contentDisposition = response.headers.get("Content-Disposition");
    const fileNameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
    a.download = fileNameMatch?.[1] ?? "report.xlsx";

    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
  }
};

onMounted(() => {
  loadReport();
});
</script>
<style>
.p-fieldset-legend-label {
  text-transform: capitalize;
}
</style>
