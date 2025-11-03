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
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 1" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/14kRHbw5QRZ7KcCI9C-VlUH_wwMxnRN1W/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX2' && detailPractice.id == 1">
            <iframe src="https://drive.google.com/file/d/14kRHbw5QRZ7KcCI9C-VlUH_wwMxnRN1W/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 2" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/1PE5o3RHgy1lvFPDSheSOzAeth0oR3z5Y/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 3" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/10ys2FIAZTLmeBmmy-zjiyKbHqa3loJWv/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 4" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/1RZDqqI3I875hXPewgSEcA0OFZZ8mhBRD/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 5" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/173t9QCQnpg9Ms2MUAo2a3jAMGpMUTWMj/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <div v-if="item.section_code === 'EX1' && detailPractice.id == 6" class="flex justify-center py-5">
            <iframe src="https://drive.google.com/file/d/19BW8HuvDOr7OkqsIPLUCjt-xEz_DmN8i/preview" width="640" height="480" allow="autoplay" :allowfullscreen="true"></iframe>
          </div>
          <!-- <Image
            :src="item?.media_url"
            :alt="`image-${item.title}`"
            width="250"
            v-if="item.media_url != null"
          /> -->
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
                :required="true"
                :placeholder="questionPlaceholder[currentNumber][index]"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <Button
              severity="success"
              type="submit"
              class="flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon class="w-5 h-5" />
              <span>Simpan Jurnal</span>
            </Button>
          </div>
        </form>
      </template>
    </Card>

    <Card v-if="hasAnswer" class="mt-5">
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
      :style="{ width: '60vw', maxWidth: '900px' }"
      :draggable="false"
      :showHeader="false"
      :closable="false"
    >
      <div class="text-center space-y-4 pt-5">
        <div class="flex flex-col bg-white items-center justify-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm">
          <p class="text-3xl italic text-gray-700 max-w-2xl">
            “{{quotes}}”
          </p>
        </div>
        <div v-if="!hasAnswer">
          <div class="flex justify-center items-center">
            <div class="mt-5 text-center text-md w-2/3 mb-5">
              Dengan mengakhiri sesi ini, kamu bisa masuk ke forum diskusi untuk
              berbagi pengalaman dengan yang lainya
            </div>
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
        <div v-else>
          <Button
            severity="danger"
            class="p-button-primary flex items-center justify-center gap-2"
            @click="endPractice"
          >
            <XCircleIcon class="w-5 h-5" />
            <span>Tutup</span>
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
// import Image from "primevue/image";
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
import { XCircleIcon } from "@heroicons/vue/24/outline";

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
const hasAnswer = ref(false);
const quotes = ref("Jangan tunggu semangat datang, mulailah dulu. Tindakan sering kali memunculkan motivasi");
const currentNumber = ref(0);

let getUser = JSON.parse(String(Cookie.get("user")));
const params = router.currentRoute.value.params.code;

if (typeof params === "string" && params.startsWith("SESI-")) {
  currentNumber.value = parseInt(params.replace("SESI-", ""));
} else {
  currentNumber.value = 0;
}

const questionPlaceholder : any = [
  [
    'Sedih, kecewa, cemas',
    'Badan menjadi lebih rileks, leher tidak lagi kaku dan merasa lebih tenang',
    'Perasaan menjadi lebih tenang',
    'Saat badan merasa tegang, leher kaku, ada perasaaan cemas dapat mempraktikan self-compassion break'
  ],
  [
    'Sedih, cemas',
    'Badan menjadi lebih rileks, leher tidak terasa kaku dan perasaan menjadi lebih tenang',
    'Badan menjadi semakin rileks dan perasaan menjadi lebih tenang',
    'Saat sedang tegang dan banyak pikiran, dapat mempraktikan sesi ini'
  ],
  [
    'Marah, cemas, khawatir',
    'Menjadi lebih tenang',
    'Menjadi lebih tenang, rileks, cemas berkurang',
    'Lebih mencintai diri sendiri'
  ],
  [
    'Sedang marah, sedih, kecewa',
    'Menjadi lebih rileks, leher tidak terasa kaku, perasaan menjadi lebih tenang',
    'Berpikir terlebih dahulu sebelum merespon orang lain, berusaha untuk menarik nafas terlebih dahulu,jika ingin marah ke orang lain',
    'Berusaha untuk tidak langsung merespon, tanpa berpikir terlebih dahulu'
  ],
  [
    'Capek, sedih dan kecewa',
    'Merasa lebih rileks, perasaan menjadi lebih tenang',
    'Badan semakin rileks dan perasaan semakin tenang',
    'Belajar mencintai diri sendiri'
  ],
  [
    'Ingin lebih mencintai diri sendiri, lebih menikmati setiap aktivitas yang dilakukan',
    'Mencintai diri sendiri, mindfullness dalam setiap aktivitas',
    'Membuat jadwal khusus untuk melakukan jurnaling harian tentang apa yang di rasakan',
    'Lebih mencintai diri sendiri'
  ]
]

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

  detailQuestion.value.forEach((item: any) => {
    if (item.answer.answer_text != undefined) {
      countAnswer = countAnswer + 1;
    }
  });

  if (countAnswer > 0) {
    hasAnswer.value = true;
  }

};

onMounted(() => {
  loadPractice(router.currentRoute.value.params.code);
  loadJournal(router.currentRoute.value.params.code);
});

const saveJournal = async () => {
  loading.value = true;

  // const payloadAttempt = {
  //   userId: getUser.id,
  //   questionnaire_id: 3,
  //   status: 'in_progress'
  // }
  // await questStore.doAttemptQuest(payloadAttempt);

  // if (questStore.submitResponse){
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
      quotes.value = questStore.submitResponse.motivation.message;
      visible.value = true;
      loading.value = false;
    }
  // }

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
