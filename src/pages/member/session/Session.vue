<template>
  <LoadingPage :visible="loading" message="Memproses Data...." />
  <!-- <div class="flex justify-center">
  <iframe src="https://drive.google.com/file/d/14kRHbw5QRZ7KcCI9C-VlUH_wwMxnRN1W/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
  </div> -->
  <div class="bg-surface-0 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-purple mb-2">
        Materi Pembelajaran <br> {{ detailPractice?.code }}</br>
      </h1>
      <p class="text-lg text-surface-600">
        <MarkdownRender :content="String(detailPractice?.short_summary)" />
      </p>
    </div>

    <Card
      class="mb-10 shadow-lg border border-surface-200"
      v-for="item in detailPracticeSections"
    >
      <template #title>
        <h2 class="text-2xl font-bold">{{ item?.title }}</h2>
      </template>
      <template #content>
        <div class="flex justify-center p-5">
          <Image
            :src="item?.media_url"
            :alt="`image-${item.title}`"
            width="250"
            v-if="item.media_url != null"
          />
        </div>
        <div v-html="item.content_html"></div>
      </template>
    </Card>

    <Card class="shadow-lg">
      <template #title>
        <h2 class="text-2xl font-bold">Jurnal Refleksi</h2>
      </template>
      <template #content>
        <p class="mb-4 text-surface-700">
          Ruang pribadi untuk merenung dan merefleksikan pengalaman dari sesi
          ini.
        </p>

        <form @submit.prevent="saveJournal">
          <div class="space-y-4">
            <div
              v-for="(question, index) in detailQuestion"
              :key="question.id || index"
            >
              <label class="font-semibold">{{ question.prompt }}</label>
              <Textarea
                v-model="journal.answers[question.id]"
                rows="2"
                class="w-full mt-2"
                :readonly="!allowSaveJournal"
                :required="true"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <Button
              severity="success"
              type="submit"
              v-if="allowSaveJournal"
              class="flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon class="w-5 h-5" />
              <span>Simpan Jurnal</span>
            </Button>
          </div>
        </form>
      </template>
    </Card>

    <Card v-if="!allowSaveJournal" class="mt-5">
      <template #content>
        <div class="flex justify-between">
          <Button
            class="p-button-info flex items-center justify-center gap-2"
            @click="goToForum"
          >
            <BookmarkSquareIcon class="w-5 h-5" />
            <span>Buka Forum Diskusi</span>
          </Button>
          <Button
            class="p-button-primary flex items-center justify-center gap-2"
            @click="nextPractice"
          >
            <span>{{ currentNumber == 6 ? 'Sesi Post Test' : 'Sesi Selanjutnya' }}</span>
            <ChevronRightIcon class="w-5 h-5" />
          </Button>
        </div>
      </template>
    </Card>

    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '25rem' }"
      :draggable="false"
      :closable="false"
      :showHeader="false"
    >
      <div class="text-center space-y-4 pt-5">
        <div class="text-lg font-medium text-gray-800">
          {{ quotes }}
        </div>

        <div class="mt-5">
          Dengan mengakhiri sesi ini, kamu bisa masuk ke forum diskusi untuk
          berbagi pengalaman dengan yang lainya
        </div>

        <div class="flex justify-center gap-3 mt-5">
          <Button
            class="p-button-primary flex items-center justify-center gap-2"
            @click="endPractice"
          >
            <CheckCircleIcon class="w-5 h-5" />
            <span>Akhiri Sesi</span>
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePracticeStore } from "../../../stores/practiceStore";
import MarkdownRender from "../../../components/MarkdownRender.vue";
import Image from "primevue/image";
import Cookie from "js-cookie";
import { useQuestStore } from "../../../stores/questStore";
import LoadingPage from "../../../components/LoadingPage.vue";
import Dialog from "primevue/dialog";
import {
  BookmarkSquareIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/solid";

const router = useRouter();
const practiceStore = usePracticeStore();
const questStore = useQuestStore();
const detailPractice = ref<any>();
const detailPracticeSections = ref<any>();
const detailJournal = ref<any>();
const detailQuestion = ref<any>();
const tmpSection = ref<any>();
const loading = ref(false);
const visible = ref(false);
const allowSaveJournal = ref(true);
const quotes = ref("");
const currentNumber = ref(0);

let getUser = JSON.parse(String(Cookie.get("user")));
const params = router.currentRoute.value.params.code;

if (typeof params === "string" && params.startsWith("SESI-")) {
  currentNumber.value = parseInt(params.replace("SESI-", ""));
} else {
  currentNumber.value = 0;
}

const loadPractice = async (code: any) => {
  loading.value = true;
  await practiceStore.detailPracticeSection(code);
  if (practiceStore.detailSection?.success) {
    tmpSection.value = practiceStore.detailSection?.data?.practice;
    detailPractice.value = practiceStore.detailSection?.data.practice;
    const filtered = tmpSection.value.sections.filter(
      (s: { section_code: string }) =>
        !["FORUM", "NAV", "JRN"].includes(s.section_code)
    );
    detailPracticeSections.value = filtered;
    loading.value = false;
  }
};

const journal = ref<{
  answers: Record<number, string>;
}>({
  answers: {},
});

const loadJournal = async (code: any) => {
  await practiceStore.detailPracticeJournal(code, getUser.id);
  detailJournal.value = practiceStore.detailJournal?.data;
  detailQuestion.value = practiceStore.detailJournal?.data.questions;

  let countAnswer = 0;

  journal.value.answers = {};
  detailQuestion.value.forEach((item: any) => {
    if (item.answer.answer_text != undefined) {
      countAnswer = countAnswer + 1;
    }
    journal.value.answers[item.id] = item.answer?.answer_text || "";
  });

  if (countAnswer == detailQuestion.value.length) {
    allowSaveJournal.value = false;
  }
};

onMounted(() => {
  loadPractice(router.currentRoute.value.params.code);
  loadJournal(router.currentRoute.value.params.code);
});

const saveJournal = async () => {
  const answer: any[] = Object.entries(journal.value.answers).map(
    ([id, text]) => ({
      questionId: Number(id),
      type: "text",
      text,
    })
  );

  const payload = {
    userId: getUser.id,
    attemptId: detailJournal.value.attempt.id,
    submit: true,
    answers: answer,
  };

  await questStore.doSubmitQuest(payload);

  if (questStore.submitResponse.success) {
    quotes.value = questStore.submitResponse.quotes;
    visible.value = true;
  }
};

const endPractice = async () => {
  const params = router.currentRoute.value.params.code;
  if (!params || typeof params !== "string") {
    console.warn("Invalid session code:", params);
    return;
  }

  const payloadStep = {
    user_id: getUser.id,
    template_id: detailPractice.value.id,
    progress_status: "completed",
  };

  await practiceStore.stepPracticeUpdate("practice", payloadStep);

  visible.value = false;

  loadPractice(params);
  loadJournal(params);
};

const nextPractice = async () => {
  visible.value = false;
  const nextNumber = currentNumber.value + 1;
  const nextCode = `SESI-${nextNumber}`;

  if (currentNumber.value == 6) {
    router.push(`/member/attempt-test/post-test`);
  } else {
    router.push(`/member/session/${nextCode}`);
  }
};

const goToForum = async () => {
  router.push("/member/forum/" + params);
};
</script>
