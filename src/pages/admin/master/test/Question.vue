<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Select from "primevue/select";
import Datatable from "primevue/datatable";
import Column from "primevue/column";

interface QuestionForm {
  question: string;
  type: string;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
}

const form = ref<QuestionForm>({
  question: "",
  type: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
});

const typeQuestionSelect = ref("");

const selectQuestionType = (val: any) => {
  typeQuestionSelect.value = val.value.code;
};

const listQuestion = ref([
  { question: "Question 1", type: "essay" },
  {
    question: "Question 2",
    type: "multiple",
    choice1: "true",
    choice2: "ture",
    choice3: "teru",
    choice4: "uret",
  },
]);

const listTypeQuestion = ref([
  { name: "Essay", code: "essay" },
  { name: "Multiple Choice", code: "multiple" },
]);

const saveTest = () => {
  console.log("Test saved:", form.value);
};

const onPage = (event: any) => {
  // const newPage = event.page + 1;
  console.log(event);
};
</script>

<template>
  <div class="container pb-10">
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-12">
        <Card>
          <template #title>Test Form</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="saveTest">
              <div>
                <label for="question" class="block mb-2 font-medium"
                  >Question</label
                >
                <InputText
                  id="question"
                  v-model="form.question"
                  class="w-full"
                  required
                />
              </div>

              <div>
                <label for="type" class="block mb-2 font-medium">Type</label>
                <Select
                  name="type"
                  :options="listTypeQuestion"
                  optionLabel="name"
                  placeholder="Pilih Tipe"
                  v-model="form.type"
                  fluid
                  @change="selectQuestionType"
                />
              </div>

              <div
                class="grid grid-cols-4 gap-5"
                v-if="typeQuestionSelect == 'multiple'"
              >
                <div>
                  <label for="choice1" class="block mb-2 font-medium"
                    >Choice 1</label
                  >
                  <InputText
                    id="choice1"
                    v-model="form.choice1"
                    class="w-full"
                    placeholder="Choice 1"
                    required
                  />
                </div>
                <div>
                  <label for="choice2" class="block mb-2 font-medium"
                    >Choice 2</label
                  >
                  <InputText
                    id="choice2"
                    v-model="form.choice2"
                    class="w-full"
                    placeholder="Choice 2"
                    required
                  />
                </div>
                <div>
                  <label for="choice3" class="block mb-2 font-medium"
                    >Choice 3</label
                  >
                  <InputText
                    id="choice3"
                    v-model="form.choice3"
                    class="w-full"
                    placeholder="Choice 3"
                    required
                  />
                </div>
                <div>
                  <label for="choice4" class="block mb-2 font-medium"
                    >Choice 4</label
                  >
                  <InputText
                    id="choice4"
                    v-model="form.choice4"
                    class="w-full"
                    placeholder="Choice 4"
                    required
                  />
                </div>
              </div>

              <Button label="Add Question" icon="pi pi-plus" type="submit" />
            </form>
          </template>
        </Card>

        <Card>
          <template #content>
            <Datatable
              :value="listQuestion"
              :lazy="true"
              paginator
              :rows="10"
              :totalRecords="50"
              :first="(1 - 1) * 10"
              @page="onPage"
              tableStyle="min-width: 50rem"
            >
              <Column header="No" style="width: 5%; text-align: center">
                <template #body="slotProps">
                  {{ (1 - 1) * 50 + slotProps.index + 1 }}
                </template>
              </Column>

              <Column field="question" header="Name" style="width: 25%" />
              <Column field="type" header="Type" style="width: 25%" />
              <Column field="choice1" header="Choice 1" style="width: 25%" />
              <Column field="choice2" header="Choice 2" style="width: 25%" />
              <Column field="choice3" header="Choice 3" style="width: 25%" />
              <Column field="choice4" header="Choice 4" style="width: 25%" />

              <!-- <Column header="Actions" style="width: 20%; text-align: center">
                <template #body="slotProps">
                  <div class="flex justify-center gap-2">
                    <Button
                      icon="pi pi-plus"
                      severity="info"
                      label="Add Question"
                      rounded
                      @click="editRow(slotProps.data)"
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      label="Hapus"
                      rounded
                      @click="deleteRow(slotProps.data)"
                    />
                  </div>
                </template>
              </Column> -->
            </Datatable>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
