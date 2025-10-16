<template>
  <LoadingPage :visible="loading" message="Memproses Data...." />
  <div class="bg-surface-0 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-purple mb-2">
        Materi Pembelajaran
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
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <Button
              label="Simpan Jurnal"
              icon="pi pi-save"
              severity="success"
              type="submit"
            />
          </div>
        </form>
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
import MarkdownRender from "../../../components/MarkdownRender.vue";
import Image from "primevue/image";
import Cookie from "js-cookie";
import { useQuestStore } from "../../../stores/questStore";
import LoadingPage from "../../../components/LoadingPage.vue";

const router = useRouter();
const practiceStore = usePracticeStore();
const questStore = useQuestStore();
const detailPractice = ref<any>();
const detailPracticeSections = ref<any>();
const detailJournal = ref<any>();
const detailQuestion = ref<any>();
const tmpSection = ref<any>();
const loading = ref(false);
let getUser = JSON.parse(String(Cookie.get("user")));

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

const loadJournal = async (code: any) => {
  await practiceStore.detailPracticeJournal(code, getUser.id);
  detailJournal.value = practiceStore.detailJournal?.data;
  detailQuestion.value = practiceStore.detailJournal?.data.questions;
};

onMounted(() => {
  loadPractice(router.currentRoute.value.params.code);
  loadJournal(router.currentRoute.value.params.code);
});

const journal = ref({
  answers: [],
});

const saveJournal = async () => {
  let payload: any = {};
  let answer: any = [];
  journal.value.answers.map((value, index) => {
    let tmpAnswer: any = {};
    tmpAnswer.questionId = index;
    tmpAnswer.type = "text";
    tmpAnswer.text = value;
    answer.push(tmpAnswer);
  });
  payload.userId = getUser.id;
  payload.attemptId = detailJournal.value.attempt.id;
  payload.submit = true;
  payload.answers = answer;
  await questStore.doSubmitQuest(payload);

  let payloadStep = {
    user_id: getUser.id,
    template_id: detailPractice.value.id,
    progress_status: "completed",
  };
  await practiceStore.stepPracticeUpdate("practice", payloadStep);

  router.push("/member/dashboard");
};
</script>

<style scoped>
.p-button.p-component {
  background-color: #774181 !important;
  color: #edebe9;
  border-color: #774181;
}
</style>
