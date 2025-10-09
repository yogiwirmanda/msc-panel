<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Select from "primevue/select";

interface TestForm {
  name: string;
  type: string;
}

const form = ref<TestForm>({
  name: "Pre Test 1",
  type: "Pre Test",
});

const listType = ref([
  { name: "Pre Test", code: "pre" },
  { name: "Post Test", code: "post" },
]);

const saveTest = () => {
  console.log("Test saved:", form.value);
};
</script>

<template>
  <div class="container pb-10">
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-9">
        <Card>
          <template #title>Test Form</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="saveTest">
              <div>
                <label for="name" class="block mb-2 font-medium"
                  >Test Name</label
                >
                <InputText
                  id="name"
                  v-model="form.name"
                  class="w-full"
                  required
                />
              </div>

              <div>
                <label for="type" class="block mb-2 font-medium">Type</label>
                <Select
                  name="type"
                  :options="listType"
                  optionLabel="name"
                  placeholder="Pilih Tipe"
                  v-model="form.type"
                  fluid
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
