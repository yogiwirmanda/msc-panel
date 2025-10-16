<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRoleStore } from "../../../stores/roleStore";

interface RoleForm {
  role: string;
}

const roleStore = useRoleStore();
const form = ref<RoleForm>({
  role: "",
});

const saveRole = async () => {
  await roleStore.addRole(form.value);
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
                <label for="name" class="block mb-2 font-medium"
                  >Role Name</label
                >
                <InputText
                  id="name"
                  v-model="form.role"
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
