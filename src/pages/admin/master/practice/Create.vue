<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { usePracticeStore } from "../../../../stores/practiceStore";

interface PracticeForm {
  code: string;
  title: string;
  short_summary: string;
  description: string;
  cover_image_url: string;
  is_active: number;
  sort_order: number;
}

const form = ref<PracticeForm>({
  code: "",
  title: "",
  short_summary: "",
  description: "",
  cover_image_url: "",
  is_active: 1,
  sort_order: 1,
});

const practiceStore = usePracticeStore();

const savePractice = async () => {
  console.log(form.value);
};
</script>

<template>
  <div class="container pb-10">
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-9">
        <Card>
          <template #title>Form Practice</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="savePractice">
              <div>
                <label for="name" class="block mb-2 font-medium"
                  >Practice Code</label
                >
                <InputText
                  id="name"
                  v-model="form.code"
                  class="w-full"
                  required
                />
              </div>
              <Button label="Save" icon="pi pi-check" type="submit" />
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
