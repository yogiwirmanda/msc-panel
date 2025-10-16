<template>
  <div class="p-5 max-w-[1366px] mx-auto">
    <Card>
      <template #content>
        <FormKit type="form" @submit="handleSubmit">
          <FormKitSchema :schema="schemaForm" />
        </FormKit>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import type { FormKitSchemaNode } from "@formkit/core";
import Card from "primevue/card";
import { onMounted, ref } from "vue";
import { useQuestStore } from "../../../stores/questStore";
import { useRouter } from "vue-router";
import Cookie from "js-cookie";

const questStore = useQuestStore();
const getQuestion = ref<any[]>([]);
const schemaForm = ref<FormKitSchemaNode[]>([]);
const router = useRouter();

const loadQuestion = async (): Promise<void> => {
  await questStore.detailQuestion("pre_test", "id", 1);
  const data = questStore.question?.data?.questions?.questions;

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
      children: "Pre Test",
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
                    "text-lg font-semibold text-blue-600 min-w-[24px] text-center",
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
            validation: q.required ? "required" : "",
            validationMessages: q.required
              ? { required: "Pilih satu jawaban." }
              : undefined,
            outerClass: "mt-3",
            wrapperClass:
              "flex flex-row flex-wrap items-center gap-x-6 gap-y-2",
            optionClass: "flex flex-row items-center space-x-2",
            inputClass:
              "text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 !w-[20px] !h-[20px]",
            optionLabelClass:
              "text-gray-700 text-sm cursor-pointer select-none",
          },
        ],
      };
    }),
  ];
};

const handleSubmit = async (
  data: Record<string, string | number>
): Promise<void> => {
  const getUserStr = Cookie.get("user");
  if (!getUserStr) return;

  const getUser = JSON.parse(getUserStr);
  const attemptId = Number(router.currentRoute.value.params.attempt);

  const formatted = Object.entries(data).map(([questionId, optionId]) => {
    const question = getQuestion.value.find((q) => q.id === Number(questionId));

    return {
      questionId: Number(questionId),
      type:
        question?.question_type === "likert"
          ? "single"
          : question?.question_type || "single",
      optionId: Number(optionId),
    };
  });

  const payload = {
    userId: getUser.id,
    attemptId,
    submit: true,
    answers: formatted,
  };

  await questStore.doSubmitQuest(payload);
};
</script>
