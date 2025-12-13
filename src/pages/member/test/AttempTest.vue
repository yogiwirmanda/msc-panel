<template>
  <LoadingPage :visible="loading" message="Memproses Data..." />
  <div class="p-5 max-w-[1366px] mx-auto">
    <Card>
      <template #title>{{
        questTemplate?.title == undefined ? "" : questTemplate?.title
      }}</template>
      <template #content>
        <MarkdownRender
          :content="
            String(
              questTemplate?.description_md == undefined
                ? ''
                : questTemplate?.description_md
            )
          "
        />
      </template>
      <template #footer>
        <Button
          class="mt-5 mr-3"
          :label="labelButton"
          v-if="!alreadyDo"
          @click="attemptQuest"
        />
        <div class="mt-5" v-else>
          <Message severity="error" class="mb-5"
            >Anda Sudah Mengisi {{ questTemplate?.title }}</Message
          >
        </div>
        <RouterLink label="Kembali" to="/member/dashboard">
          <Button severity="danger"> Kembali </Button>
        </RouterLink>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import { useQuestStore } from "../../../stores/questStore";
import { onMounted, ref } from "vue";
import MarkdownRender from "../../../components/MarkdownRender.vue";
import Button from "primevue/button";
import Cookie from "js-cookie";
import { useRouter } from "vue-router";
import Message from "primevue/message";
import LoadingPage from "../../../components/LoadingPage.vue";
import { usePracticeStore } from "../../../stores/practiceStore";

const questStore = useQuestStore();
const questTemplate = ref<any>({});
const router = useRouter();
const alreadyDo = ref(false);
const loading = ref(false);
const practiceStore = usePracticeStore();
const practiceStep = ref<any>();
const findPre = ref<any>(null);
const findPost = ref<any>(null);
const attempInProgress = ref<any>(false);
const currentAttempId = ref<any>({});
const labelButton = ref<string>("Proses Cek Data");

let getUser = JSON.parse(String(Cookie.get("user")));

const findAttempQuest = async (questionnaireId: number) => {
  await questStore.findAttemptQuest(getUser.id, questionnaireId);
  if (questStore.attemptResponse.success) {
    currentAttempId.value = questStore.attemptResponse.data.questAttempt.id;
    loading.value = false;
  }
};

const loadQuestTemplate = async () => {
  loading.value = true;
  let getType = String(router.currentRoute.value.params.type);
  let idTemplate = getType == "pre-test" ? 1 : 2;
  await questStore.detailTemplate(getType.replace("-", "_"), "id", idTemplate);
  if (questStore.questTemplate?.success) {
    questTemplate.value = questStore.questTemplate?.data.questTemplate;
    if (attempInProgress.value) {
      labelButton.value = `Lanjutkan ${questTemplate.value.title}`;
    } else {
      labelButton.value = `Mulai ${questTemplate.value.title}`;
    }
    findAttempQuest(questTemplate.value.id);
  }
};

const attemptQuest = async () => {
  let getType = String(router.currentRoute.value.params.type);
  if (attempInProgress.value) {
    if (getType == "pre-test") {
      router.push(`/member/pre-test/${currentAttempId.value}`);
    } else {
      router.push(`/member/post-test/${currentAttempId.value}`);
    }
  } else {
    let payload = {
      user_id: getUser.id,
      questionnaire_id: questTemplate.value.id,
      status: "in_progress",
    };
    await questStore.doAttemptQuest(payload);
    if (questStore.attemptResponse.success) {
      if (getType == "pre-test") {
        router.push(
          `/member/pre-test/${questStore.attemptResponse.data.questAttemptCreate.id}`
        );
      } else {
        router.push(
          `/member/post-test/${questStore.attemptResponse.data.questAttemptCreate.id}`
        );
      }
    }
  }
};

const getStepPractice = async () => {
  loading.value = true;
  let getUser = JSON.parse(String(Cookie.get("user")));
  await practiceStore.getPracticeStep(getUser.id);
  if (practiceStore.stepPractice?.success) {
    practiceStep.value = practiceStore.stepPractice?.data.practice_steps ?? [];
  }
  findPost.value = practiceStep.value.find((item: any) => item.code === "POST");
  findPre.value = practiceStep.value.find((item: any) => item.code === "PRE");
  let getType = String(router.currentRoute.value.params.type);
  if (getType == "pre-test") {
    if (findPre.value.status == "completed") {
      alreadyDo.value = true;
    }
    if (findPre.value.status == "in_progress") {
      attempInProgress.value = true;
    }
  } else {
    if (findPost.value.status == "completed") {
      alreadyDo.value = true;
    }
    if (findPost.value.status == "in_progress") {
      attempInProgress.value = true;
    }
  }
  setTimeout(() => {
    loadQuestTemplate();
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  getStepPractice();
});
</script>
