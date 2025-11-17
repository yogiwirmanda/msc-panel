<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useJournalStore } from "../../../stores/journalStore";
import { useRouter } from "vue-router";
import { EyeIcon } from "@heroicons/vue/24/outline";
import LoadingPage from "../../../components/LoadingPage.vue";

const journalStore = useJournalStore();
const listJournal = ref<any[]>([]);
const visible = ref(false);
const selectedJournals = ref<any[]>([]);
const router = useRouter();
const loading = ref(false);

const loadJournal = async () => {
  loading.value = true;
  await journalStore.getAllJournal(Number(router.currentRoute.value.params.id));
  if (journalStore.journals) {
    listJournal.value = journalStore.journals.data;
  }
  setTimeout(() => {
    loading.value = false;
  }, 1500);
};

const openModal = (data: any) => {
  selectedJournals.value = data.journals || [];
  visible.value = true;
};

onMounted(() => {
  loadJournal();
});
</script>

<template>
  <div class="container pb-10">
    <LoadingPage :visible="loading" message="Memproses Data...." />
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-12">
        <Card v-if="listJournal.length > 0">
          <template #title>
            <div class="flex justify-between">
              <div>Journal List</div>
              <Button
                as="a"
                class="mx-2"
                severity="danger"
                label="Kembali"
                href="/admin/report"
              />
            </div>
          </template>
          <template #content>
            <DataTable
              :value="listJournal"
              paginator
              :rows="5"
              tableStyle="min-width: 40rem"
            >
              <Column field="journal_submitted_at" header="Tanggal">
                <template #body="{ data }">
                  {{
                    new Date(data.journal_submitted_at).toLocaleDateString(
                      "id-ID"
                    )
                  }}
                </template>
              </Column>

              <Column header="Sesi">
                <template #body="{ data }">
                  {{ data.journals?.[0]?.items?.[0].title || "-" }}
                </template>
              </Column>

              <Column header="Action">
                <template #body="{ data }">
                  <Button
                    label="View Details"
                    class="p-button-text p-button-sm"
                    @click="openModal(data)"
                  >
                    <EyeIcon class="w-5 h-5" />
                    <span>View Details</span>
                  </Button>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
        <Card v-else>
          <template #content>
            <div class="flex justify-center items-center">
              <div class="text-lg">Belum Ada Data</div>
            </div>
          </template>
        </Card>
        <Dialog
          v-model:visible="visible"
          modal
          header="My Journals"
          :style="{ width: '50vw' }"
        >
          <Card
            v-if="selectedJournals.length"
            v-for="valueGroup in selectedJournals"
            class="mb-5"
          >
            <template #content>
              <div class="w-full mb-5">
                <div class="mt-5">
                  Tanggal :
                  {{
                    new Date(valueGroup.items[0].created_at).toLocaleDateString(
                      "id-ID"
                    )
                  }}
                </div>
                <div class="grid grid-cols-2 gap-5 journals-list">
                  <Card
                    v-for="(journal, index) in valueGroup.items"
                    :key="index"
                    class="card-journal"
                  >
                    <template #content>
                      <div class="mt-2 whitespace-pre-line italic">
                        Pertanyaan : {{ journal.prompt }}
                      </div>
                      <div class="mt-5 whitespace-pre-line font-semibold">
                        {{ journal.answer_text }}
                      </div>
                    </template>
                  </Card>
                </div>
              </div>
            </template>
          </Card>
          <div v-else class="text-center py-5 text-gray-500">
            No journals available
          </div>
        </Dialog>
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
