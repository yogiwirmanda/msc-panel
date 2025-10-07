<template>
  <div class="bg-surface-0 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-purple mb-2">
        Materi Pembelajaran
      </h1>
      <p class="text-lg text-surface-600">
        {{ detailPractice?.short_summary }}
      </p>
    </div>

    <Card class="mb-10 shadow-lg border border-surface-200">
      <template #title>
        <h2 class="text-2xl font-bold">{{ detailPractice?.title }}</h2>
      </template>
      <template #content>
        <p class="text-surface-700 leading-relaxed mb-4">
          {{ detailPractice?.description_md }}
        </p>
      </template>
    </Card>

    <h2 class="text-2xl font-bold mb-6">Latihan Praktik</h2>
    <div class="grid md:grid-cols-1 gap-6 mb-12">
      <Card class="shadow-md">
        <template #title>
          <span class="text-xl font-semibold">Panduan Body Scan</span>
        </template>
        <template #content>
          <p class="mb-3 text-surface-600">
            Latihan ini membantu Anda terhubung dengan sensasi fisik tubuh.
            Lakukan di tempat tenang.
          </p>
          <video controls class="w-full rounded-lg shadow">
            <!-- <source src="/videos/body-scan.mp4" type="video/mp4" /> -->
          </video>
        </template>
      </Card>

      <Card class="shadow-md">
        <template #title>
          <span class="text-xl font-semibold">Self-Compassion Break</span>
        </template>
        <template #content>
          <p class="mb-3 text-surface-600">
            “Jeda” singkat untuk merespon emosi negatif dengan kehangatan &
            dukungan.
          </p>
          <video controls class="w-full rounded-lg shadow">
            <!-- <source src="/videos/self-compassion.mp4" type="video/mp4" /> -->
          </video>
        </template>
      </Card>
    </div>

    <Card class="shadow-lg">
      <template #title>
        <h2 class="text-2xl font-bold">Menulis Pengalaman</h2>
      </template>
      <template #content>
        <p class="mb-4 text-surface-700">
          Ruang pribadi untuk merenung dan merefleksikan pengalaman dari sesi
          ini.
        </p>

        <div class="space-y-4">
          <div>
            <label class="font-semibold"
              >Sebelum Latihan : Bagaimana perasaan Anda sebelum memulai sesi
              ini?</label
            >
            <Textarea v-model="journal.before" rows="2" class="w-full mt-2" />
          </div>
          <div>
            <div class="font-semibold w-1/2">
              Apa yang Anda rasakan setelah melakukan praktik mindful body scan?
              Adakah sensasi atau emosi baru yang Anda sadari?
            </div>
            <Textarea
              v-model="journal.afterBody"
              rows="2"
              class="w-full mt-2"
            />
          </div>
          <div>
            <div class="font-semibold w-1/2">
              Bagaimana perasaan Anda setelah melakukan latihan Self-Compassion
              Break? Apakah ada perubahan pada emosi yang Anda rasakan di awal?
            </div>
            <Textarea
              v-model="journal.afterCompassion"
              rows="2"
              class="w-full mt-2"
            />
          </div>
          <div>
            <label class="font-semibold"
              >Apa satu hal baru yang Anda pelajari tentang diri Anda di sesi
              ini?
            </label>
            <Textarea v-model="journal.learning" rows="2" class="w-full mt-2" />
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <Button
            label="Simpan Jurnal"
            icon="pi pi-save"
            severity="success"
            @click="saveJournal"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePracticeStore } from "../../../stores/practiceStore";

const router = useRouter();
const practiceStore = usePracticeStore();
const detailPractice = ref(null);

const loadPractice = async (code: any) => {
  await practiceStore.detailPractice(code);
  detailPractice.value = practiceStore.practice.data.practice;
};

onMounted(() => {
  loadPractice(router.currentRoute.value.params.code);
});

console.log();

const journal = ref({
  before: "",
  afterBody: "",
  afterCompassion: "",
  learning: "",
});

const saveJournal = () => {
  console.log("Jurnal disimpan:", journal.value);
  alert("Jurnal berhasil disimpan!");
};
</script>

<style scoped>
.p-button.p-component {
  background-color: #774181 !important;
  color: #edebe9;
  border-color: #774181;
}
</style>
