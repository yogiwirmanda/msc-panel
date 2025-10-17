<template>
  <LoadingPage :visible="loading" message="Memproses Data...." />
  <div class="bg-surface-0 px-6 md:px-12 lg:px-20 py-20 text-center">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-4 mb-[50px]">
        <div class="font-bold text-3xl leading-tight">
          <h2
            class="font-extrabold text-4xl md:text-5xl leading-tight tracking-tight drop-shadow-md"
          >
            Mindful Self-compassion
          </h2>
        </div>
        <p class="text-lg md:text-xl text-black/90 max-w-2xl">
          Pelatihan Mindful Self-Compassion (MSC) dirancang untuk membantu Anda
          menerima diri sendiri, mengelola emosi, dan membangun hubungan yang
          lebih sehat dengan diri sendiri dan orang lain.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="item in practiceStep"
          :key="item.section"
          class="flex flex-col"
        >
          <Card
            class="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <template #title>
              <div class="mb-1 text-2xl font-bold text-surface-900">
                {{ item.code }}
              </div>
              <div class="mb-3 text-lg text-surface-600 font-medium">
                {{ item.title }}
              </div>
            </template>

            <template #content>
              <div class="relative w-full overflow-hidden rounded-xl">
                <Image
                  :src="`/images/${getImageFromCodeSession(item.code)}`"
                  :alt="`Image-${item.code}`"
                  imageClass="w-full h-56 object-cover rounded-xl"
                  preview
                />
              </div>

              <div class="mt-5 space-y-2 text-center">
                <div
                  class="text-surface-900 text-md font-normal leading-relaxed"
                >
                  <MarkdownRender :content="String(item.description_md)" />
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-center mt-4">
                <Button
                  :class="`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${item.status}`"
                  type="button"
                  @click="goToSession(item.code)"
                  :disabled="checkStatusCompleted(item.code)"
                >
                  <component :is="getIcon(item.code)" class="w-5 h-5" />
                  <span>{{ getLabel(item.code) }}</span>
                </Button>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Image from "primevue/image";
import { useRouter } from "vue-router";
import { usePracticeStore } from "../../../stores/practiceStore";
import Cookie from "js-cookie";
import { onMounted, ref } from "vue";
import MarkdownRender from "../../MarkdownRender.vue";
import LoadingPage from "../../LoadingPage.vue";

import {
  CheckCircleIcon,
  ArrowRightCircleIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/vue/24/solid";

const router = useRouter();
const practiceStore = usePracticeStore();
const practiceStep = ref<any>();
const needStarted = ref("");
const loading = ref(false);

const goToSession = (code: any) => {
  switch (code) {
    case "PRE":
      router.push("/member/attempt-test/pre-test");
      break;
    case "POST":
      router.push("/member/attempt-test/post-test");
      break;
    default:
      router.push("/member/session/" + code);
      break;
  }
};

const getStepPractice = async () => {
  loading.value = true;
  let getUser = JSON.parse(String(Cookie.get("user")));
  await practiceStore.getPracticeStep(getUser.id);
  if (practiceStore.stepPractice?.success) {
    practiceStep.value = practiceStore.stepPractice?.data.practice_steps ?? [];
    getNotStarted();
  }
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

const getNotStarted = () => {
  let result = practiceStep.value
    .slice()
    .find((item: { status: string }) => item.status === "not_started");
  needStarted.value = result?.code ?? "";
};

const getImageFromCodeSession = (code: string) => {
  switch (code.toLowerCase()) {
    case "sesi-1":
      return "sesi-1.jpg";
    case "sesi-2":
      return "sesi-2.jpg";
    case "sesi-3":
      return "sesi-3.png";
    case "sesi-4":
      return "sesi-4.webp";
    case "sesi-5":
      return "sesi-5.png";
    case "sesi-6":
      return "sesi-6.png";
    case "pre":
    case "post":
      return "test.png";
    default:
      return "logo.webp";
  }
};

const checkStatusCompleted = (code: any) => {
  const item = practiceStep.value.find(
    (step: { code: any }) => step.code === code
  );
  if (!item) return true;
  if (item.status === "not_started") {
    return item.code !== needStarted.value;
  }
  return false;
};

const getLabel = (code: any) => {
  const item = practiceStep.value.find(
    (step: { code: any }) => step.code === code
  );
  switch (item?.status) {
    case "completed":
      return "Selesai";
    case "in_progress":
      return "Proses";
    case "not_started":
      return "Masuk ke " + item.code;
    default:
      return "";
  }
};

const getIcon = (code: any) => {
  const item = practiceStep.value.find(
    (step: { code: any }) => step.code === code
  );
  switch (item?.status) {
    case "completed":
      return CheckCircleIcon;
    case "in_progress":
      return EllipsisHorizontalCircleIcon;
    case "not_started":
      return ArrowRightCircleIcon;
    default:
      return ArrowRightCircleIcon;
  }
};

onMounted(() => {
  getStepPractice();
});
</script>

<style>
.image-training-section {
  height: 300px;
  object-fit: cover;
}
</style>
