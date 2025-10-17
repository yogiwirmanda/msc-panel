<template>
  <LoadingPage :visible="loading" message="Memproses Data..." />
  <div class="p-5 max-w-[1366px] mx-auto">
    <Card>
      <template #title>{{ questTemplate?.title }}</template>
      <template #content>
        <MarkdownRender :content="String(questTemplate?.description_md)" />
      </template>
      <template #footer>
        <Button
          class="mt-5 mr-3"
          :label="`Mulai ${questTemplate?.title}`"
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

const questStore = useQuestStore();
const questTemplate = ref<any>();
const router = useRouter();
const alreadyDo = ref(false);
const loading = ref(false);

let getUser = JSON.parse(String(Cookie.get("user")));

const findAttempQuest = async (questionnaireId: number) => {
  await questStore.findAttemptQuest(getUser.id, questionnaireId);
  if (questStore.attemptResponse.success) {
    if (Object.keys(questStore.attemptResponse.data).length === 0) {
      alreadyDo.value = false;
    } else {
      alreadyDo.value = true;
    }
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
    findAttempQuest(questTemplate.value.id);
  }
};

const attemptQuest = async () => {
  let getType = String(router.currentRoute.value.params.type);
  let payload = {
    user_id: getUser.id,
    questionnaire_id: questTemplate.value.id,
    status: "in_progress",
  };
  await questStore.doAttemptQuest(payload);
  if (getType == "pre-test") {
    router.push(
      `/member/pre-test/${questStore.attemptResponse.data.questAttemptCreate.id}`
    );
  } else {
    router.push(
      `/member/post-test/${questStore.attemptResponse.data.questAttemptCreate.id}`
    );
  }
};

onMounted(() => {
  loadQuestTemplate();
});
</script>
