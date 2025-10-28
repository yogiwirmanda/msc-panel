<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import type { ProfileForm } from "../../../../types/profile";
import { useUserStore } from "../../../../stores/userStore";
import { useRoleStore } from "../../../../stores/roleStore";
import Password from "primevue/password";

const form = ref<ProfileForm>({
  name: "WiweAdmin",
  email: "wiweadmin@yopmail.com",
  telepon: "081217018168",
  id_role: 1,
  password: "",
});

const userStore = useUserStore();
const roleStore = useRoleStore();
const roles = ref<any>([]);
const role = ref();

const loadDataRole = async () => {
  await roleStore.fetchRoles(1);
  roles.value = roleStore.roles;
  console.log("Loaded roles:", roles.value);
};

const saveUser = async () => {
  form.value.id_role = role.value.id;
  await userStore.addUser(form.value);
  console.log("Profile saved:", form.value);
};

onMounted(() => {
  loadDataRole();
});
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
                <InputText id="phone" v-model="form.telepon" class="w-full" />
              </div>

              <div>
                <label for="password" class="block mb-2 font-medium"
                  >Password</label
                >
                <Password
                  id="password"
                  v-model="form.password"
                  placeholder="Password"
                  :toggleMask="true"
                  :feedback="false"
                  input-class="w-full!"
                />
              </div>

              <div>
                <label for="role" class="block mb-2 font-medium">Role</label>
                <Dropdown
                  v-model="role"
                  :options="roles"
                  optionLabel="role"
                  placeholder="Select a Role"
                  class="w-full md:w-56"
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
