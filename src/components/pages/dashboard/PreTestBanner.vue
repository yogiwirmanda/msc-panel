<template>
  <div
    v-if="!completed"
    class="p-3 shadow-2 mb-4 surface-card flex align-items-center justify-around gap-3"
  >
    <div class="flex items-center gap-3">
      <i class="pi pi-exclamation-circle text-yellow-600 text-2xl"></i>
      <div>
        <div class="text-lg font-semibold">Before you start practice</div>
        <div class="text-sm text-600">
          Please fill the pre-test so we can tailor the exercise to your level.
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <Button label="Take Pre-test" icon="pi pi-pencil" @click="goToPretest" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const storageKey = "pretest_completed_v1";
const completed = ref(false);
const router = useRouter();

onMounted(() => {
  try {
    const v = localStorage.getItem(storageKey);
    if (v === "true") completed.value = true;
  } catch (e) {}
});

function goToPretest() {
  router.push("/member/pre-test");
}

function dismissTemporarily() {
  completed.value = true;
}
</script>

<style scoped>
.surface-card {
  background: var(--surface-card, #fff);
  border-radius: 8px;
}
</style>
