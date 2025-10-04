<template>
  <div class="bg-surface-0 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-purple mb-2">
        Materi Pembelajaran
      </h1>
      <p class="text-lg text-surface-600">
        Selamat datang di sesi pertama perjalanan welas asih pada diri sendiri.
      </p>
    </div>

    <Card class="mb-10 shadow-lg border border-surface-200">
      <template #title>
        <h2 class="text-2xl font-bold">Fondasi Welas Asih</h2>
      </template>
      <template #content>
        <p class="text-surface-700 leading-relaxed mb-4">
          Tujuan utama kita adalah memahami secara mendalam apa itu welas asih
          pada diri sendiri dan mengapa hal itu penting. Welas asih bukanlah
          memanjakan diri, melainkan membangun kekuatan batin untuk merespons
          kesulitan, ketidaksempurnaan, dan kegagalan dengan kebaikan serta
          pengertian, bukan kritik.
        </p>
        <ul class="list-disc pl-6 space-y-2 text-surface-700">
          <li>
            <span class="font-semibold">Mindfulness:</span> keterampilan hadir
            penuh di momen sekarang.
          </li>
          <li>
            <span class="font-semibold">Self-Compassion:</span> memperlakukan
            diri dengan kebaikan saat sulit.
          </li>
        </ul>
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
            <label class="font-semibold">Sebelum Latihan</label>
            <Textarea v-model="journal.before" rows="2" class="w-full mt-2" />
          </div>
          <div>
            <label class="font-semibold">Setelah Body Scan</label>
            <Textarea
              v-model="journal.afterBody"
              rows="2"
              class="w-full mt-2"
            />
          </div>
          <div>
            <label class="font-semibold">Setelah Self-Compassion Break</label>
            <Textarea
              v-model="journal.afterCompassion"
              rows="2"
              class="w-full mt-2"
            />
          </div>
          <div>
            <label class="font-semibold">Hal Baru yang Dipelajari</label>
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
  <div class="bg-surface-0 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <Card>
      <template #content>
        <h1 class="text-3xl md:text-4xl font-bold text-purple mb-2 text-center">
          Forum Diskusi
        </h1>
        <Discussion />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { ref } from "vue";
import Discussion from "../discussion/Discussion.vue";

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
