<template>
  <LoadingPage :visible="loading" message="Memproses Data Soal.." />
  <div class="p-5 max-w-[1366px] mx-auto">
    <Card>
      <template #content>
        <FormKit type="form" @submit="handleSubmit">
          <FormKitSchema :schema="schemaForm" />
          <template #actions>
            <button
              type="submit"
              class="mt-6 bg-purple text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 w-full md:w-auto"
            >
              Kirim Jawaban
            </button>
          </template>
        </FormKit>
      </template>
    </Card>
    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '60vw', maxWidth: '900px' }"
      :draggable="false"
      :closable="false"
      :showHeader="false"
    >
      <div class="text-center space-y-4 pt-5">
        <div
          class="flex flex-col bg-white items-center justify-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm"
        >
          <p class="text-3xl italic text-gray-700 max-w-2xl">“{{ quotes }}”</p>
        </div>
        <div class="flex justify-center gap-3 mt-5">
          <Button
            class="p-button-primary flex items-center justify-center gap-2"
            @click="endPosTest"
          >
            <CheckCircleIcon class="w-5 h-5" />
            <span>Akhiri Post Test</span>
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
  <Dialog
    v-model:visible="visibleAlert"
    modal
    :style="{ width: '60vw', maxWidth: '900px' }"
    :draggable="false"
    :closable="false"
    :showHeader="false"
  >
    <div class="text-center space-y-4 pt-5">
      <div
        class="flex flex-col bg-white items-center justify-center text-center p-8 bg-gray-50 rounded-2xl shadow-sm"
      >
        <p class="text-3xl italic text-gray-700 max-w-2xl">
          Jika kamu meninggalkan halaman Post Test ini, sebelum semua selesai
          maka pertanyaan yang tidak di jawab akan kami anggap 0
        </p>
      </div>
      <div class="flex justify-center gap-3 mt-5">
        <Button
          class="p-button-primary flex items-center justify-center gap-2"
          @click="endPosTest"
        >
          <CheckCircleIcon class="w-5 h-5" />
          <span>Akhiri Post Test</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import type { FormKitSchemaNode } from "@formkit/core";
import Card from "primevue/card";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useQuestStore } from "../../../stores/questStore";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import Cookie from "js-cookie";
import LoadingPage from "../../../components/LoadingPage.vue";
import { usePracticeStore } from "../../../stores/practiceStore";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";

const questStore = useQuestStore();
const getQuestion = ref<any[]>([]);
const schemaForm = ref<FormKitSchemaNode[]>([]);
const detailQuest = ref<any>();
const router = useRouter();
const loading = ref(false);
const practiceStore = usePracticeStore();
const visible = ref(false);
const visibleAlert = ref(false);
const quotes = ref("");

const loadQuestion = async (): Promise<void> => {
  loading.value = true;
  await questStore.detailQuestion("post_test", "id", 2);
  const data = questStore.question?.data?.questions?.questions;
  detailQuest.value = questStore.question?.data?.questions;

  if (Array.isArray(data)) {
    getQuestion.value = data;
    mapQuestion();
  } else {
    getQuestion.value = [];
  }
};

onMounted(() => {
  loadQuestion();
});

const mapQuestion = (): void => {
  schemaForm.value = [
    {
      $el: "h1",
      children: "Post Test",
      attrs: { class: "text-2xl font-bold mb-4" },
    },
    ...getQuestion.value.map((q, index) => {
      const type = q.question_type === "likert" ? "radio" : "text";
      const options = q.options?.map((opt: { label: any; id: any }) => ({
        label: opt.label,
        value: opt.id,
      }));

      return {
        $el: "div",
        attrs: {
          class:
            "bg-white shadow-sm rounded-xl p-6 mb-6 border border-gray-100",
        },
        children: [
          {
            $el: "div",
            attrs: { class: "flex items-center gap-2 mb-4" },
            children: [
              {
                $el: "span",
                children: `${index + 1}.`,
                attrs: {
                  class:
                    "text-lg font-semibold text-black min-w-[24px] text-center",
                },
              },
              {
                $el: "h2",
                children: q.prompt,
                attrs: {
                  class: "font-medium text-gray-800 leading-snug",
                },
              },
            ],
          },
          {
            $formkit: type,
            name: `${q.id}`,
            label: "",
            options,
            optionsLayout: "inline",
            // validation: q.required ? "required" : "",
            validationMessages: q.required
              ? { required: "Pilih satu jawaban." }
              : undefined,
            outerClass: "mt-3",
            wrapperClass:
              "flex flex-row flex-wrap items-center gap-x-6 gap-y-2",
            optionClass: "flex flex-row items-center space-x-2",
            inputClass:
              "text-black border-gray-300 focus:ring-blue-500 focus:ring-2 !w-[20px] !h-[20px]",
            optionLabelClass:
              "text-gray-700 text-sm cursor-pointer select-none",
          },
        ],
      };
    }),
  ];
  loading.value = false;
};

const handleSubmit = async (
  data: Record<string, string | number>
): Promise<void> => {
  const getUserStr = Cookie.get("user");
  if (!getUserStr) return;

  const getUser = JSON.parse(getUserStr);
  const attemptId = Number(router.currentRoute.value.params.attempt);

  const formatted = getQuestion.value.map((q) => {
    const answer = data[q.id];
    return {
      questionId: q.id,
      type:
        q.question_type === "likert" ? "single" : q.question_type || "single",
      optionId: answer ? Number(answer) : null,
    };
  });

  const payload = {
    userId: getUser.id,
    attemptId,
    submit: true,
    answers: formatted,
  };

  await questStore.doSubmitQuest(payload);
  quotes.value = questStore.submitResponse.motivation.message;
  visible.value = true;

  const payloadStep = {
    user_id: getUser.id,
    template_id: detailQuest.value.id,
    progress_status: "completed",
  };
  await practiceStore.stepPracticeUpdate("quest", payloadStep);
};

const endPosTest = async () => {
  visible.value = false;
  router.push("/member/dashboard");
};

onMounted(() => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });
});

onBeforeRouteLeave((to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);
  visibleAlert.value = true;
});
</script>
