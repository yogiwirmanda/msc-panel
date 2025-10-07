<template>
  <div class="p-5">
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
import { FormKitSchema, defaultConfig, plugin } from "@formkit/vue";
import Card from "primevue/card";
import { createApp, onMounted } from "vue";

onMounted(() => {
  const app = createApp({});
  app.use(plugin, defaultConfig);
});

const schemaForm = [
  {
    $el: "h1",
    children: "Pre Test",
    attrs: { class: "text-2xl font-bold mb-4" },
  },
  {
    $formkit: "text",
    name: "question_1",
    label: "Apakah Anda Mengantuk ?",
    help: "Describe the Answer",
    validation: "required",
  },
  {
    $formkit: "radio",
    name: "question_2",
    label: "Siapa Penemu Bumi Ini ?",
    options: [
      { label: "Helmi", value: "hy" },
      { label: "Jokowi", value: "jkw" },
      { label: "SBY", value: "sby" },
      { label: "Pak Gandhi", value: "capt" },
    ],
    validation: "required",
    validationMessages: {
      required: "Pilih satu jawaban.",
    },

    outerClass: "mb-4",
    labelClass: "block text-sm font-medium text-gray-700 mb-2",
    wrapperClass: "flex flex-row flex-wrap gap-4",
    optionClass: "flex items-center space-x-2",
    inputClass:
      "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2",
    optionLabelClass: "text-gray-700 text-sm cursor-pointer select-none",
  },
  {
    $formkit: "submit",
    label: "Register Now",
    outerClass: "mt-6",
    inputClass:
      "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded",
  },
];

const handleSubmit = (data: any) => {
  console.log("Form submitted:", data);
};
</script>
