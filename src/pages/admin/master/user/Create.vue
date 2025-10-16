<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import type { ProfileForm } from "../../../../types/profile";

const form = ref<ProfileForm>({
  name: "Wiwe Artemis",
  email: "wiwekingz@yopmail.com",
  phone_number: "6281217018168",
});

const saveUser = () => {
  console.log("Profile saved:", form.value);
};
</script>

<template>
  <div class="container pb-10">
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-9">
        <Card>
          <template #title>User Form</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="saveUser">
              <div>
                <label for="name" class="block mb-2 font-medium">Name</label>
                <InputText
                  id="name"
                  v-model="form.name"
                  class="w-full"
                  required
                />
              </div>

              <div>
                <label for="email" class="block mb-2 font-medium">Email</label>
                <InputText
                  id="email"
                  type="email"
                  v-model="form.email"
                  class="w-full"
                  required
                />
              </div>

              <div>
                <label for="phone" class="block mb-2 font-medium"
                  >Phone Number</label
                >
                <InputText
                  id="phone"
                  v-model="form.phone_number"
                  class="w-full"
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
