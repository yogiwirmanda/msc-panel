<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import MenuProfile from "../../../components/pages/account/MenuProfile.vue";
import HeaderProfile from "../../../components/pages/account/HeaderProfile.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useJournalStore } from "../../../stores/journalStore";
import Cookie from "js-cookie";

const journalStore = useJournalStore();
const listJournal = ref<any[]>([]);
const visible = ref(false);
const selectedJournals = ref<any[]>([]);

const getUser = JSON.parse(String(Cookie.get("user")));
const loadJournal = async () => {
  await journalStore.getAllJournal(getUser.id);
  if (journalStore.journals) {
    listJournal.value = journalStore.journals.data;
  }
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
                  {{ data.journals?.[0]?.title || "-" }}
                </template>
              </Column>

              <Column header="Action">
                <template #body="{ data }">
                  <Button
                    label="View Details"
                    icon="pi pi-eye"
                    class="p-button-text p-button-sm"
                    @click="openModal(data)"
                  />
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
        <Dialog
          v-model:visible="visible"
          modal
          header="My Journals"
          :style="{ width: '50vw' }"
        >
          <div
            v-if="selectedJournals.length"
            class="grid grid-cols-2 gap-5 journals-list"
          >
            <Card
              v-for="(journal, index) in selectedJournals"
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
