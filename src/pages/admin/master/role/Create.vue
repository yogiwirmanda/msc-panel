<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

interface RoleForm {
  name: string;
}

const form = ref<RoleForm>({
  name: "Superadmin",
});

const saveRole = () => {
  console.log("User saved:", form.value);
};
</script>

<template>
  <div class="container pb-10">
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-9">
        <Card>
          <template #title>Form Role</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="saveRole">
              <div>
                <label for="name" class="block mb-2 font-medium">Name</label>
                <InputText
                  id="name"
                  v-model="form.name"
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
