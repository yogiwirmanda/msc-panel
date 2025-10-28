<template>
  <Toast />
  <div
    class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80 h-screen flex justify-center items-center"
  >
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-sm mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <Image src="/images/logo.webp" />
        </div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 text-2xl font-semibold leading-tight text-center w-full"
          >
            Admin Area
          </div>
        </div>
      </div>
      <form class="space-y-4" @submit.prevent="doLogin">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <label
              for="username"
              class="text-surface-900 font-medium leading-normal"
              >Username</label
            >
            <InputText
              id="username"
              type="text"
              v-model="form.username"
              placeholder="Username"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': errors.username }"
            />
            <small v-if="errors.username" class="text-red-500">{{
              errors.username
            }}</small>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="password1"
              class="text-surface-900 font-medium leading-normal"
              >Password</label
            >
            <Password
              id="password"
              v-model="form.password"
              placeholder="Password"
              :toggleMask="true"
              :feedback="false"
              input-class="w-full!"
              :class="{ 'border-red-500': errors.password }"
            />
            <small v-if="errors.password" class="text-red-500">{{
              errors.password
            }}</small>
          </div>
        </div>
        <Button
          :label="loading ? 'Signing In...' : 'Sign In'"
          icon="pi pi-user"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          type="submit"
          :disabled="loading"
        >
          <template #icon>
            <UserCircleIcon class="w-5 h-5" />
          </template>
        </Button>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import Toast from "primevue/toast";
import type { LoginForm } from "../../types/auth";
import { UserCircleIcon } from "@heroicons/vue/24/outline";

const form = ref<LoginForm>({
  username: "",
  password: "",
});

const errors = ref({
  username: "",
  password: "",
});

const authStore = useAuthStore();
const loading = ref(false);

const validateForm = () => {
  let valid = true;
  errors.value = { username: "", password: "" };

  if (!form.value.username.trim()) {
    errors.value.username = "Username wajib diisi";
    valid = false;
  }

  if (!form.value.password.trim()) {
    errors.value.password = "Password wajib diisi";
    valid = false;
  } else if (form.value.password.length < 9) {
    errors.value.password = "Password minimal 9 karakter";
    valid = false;
  }

  return valid;
};

const doLogin = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    await authStore.loginAdmin(form.value);
    if (authStore.data.success) {
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    }
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};
</script>
