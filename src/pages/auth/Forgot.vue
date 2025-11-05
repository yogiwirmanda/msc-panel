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
            Lupa Password
          </div>
        </div>
      </div>
      <form class="space-y-4" @submit.prevent="doLogin">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <label
              for="email"
              class="text-surface-900 font-medium leading-normal"
              >Masukkan Email</label
            >
            <InputText
              id="email"
              type="text"
              v-model="form.email"
              placeholder="Masukkan E-mail"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
              :class="{ 'border-red-500': errors.email }"
            />
            <small v-if="errors.email" class="text-red-500">{{
              errors.email
            }}</small>
          </div>
        </div>
        <Button
          :label="loading ? 'Mengirim ke email...' : 'Simpan'"
          icon="pi pi-user"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          type="submit"
          :disabled="loading"
        >
          <template #icon>
            <UserCircleIcon class="w-5 h-5" />
          </template>
        </Button>
        <div class="text-center">
          Sudah Punya Akun ?
          <RouterLink to="/login" class="mt-5 text-blue-500">Login</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";

import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import Toast from "primevue/toast";
import type { LoginForm } from "../../types/auth";
import { RouterLink } from "vue-router";
import { UserCircleIcon } from "@heroicons/vue/24/outline";

const form = ref<LoginForm>({
  email: "",
});

const errors = ref({
  email: "",
});

const authStore = useAuthStore();
const loading = ref(false);

const validateForm = () => {
  let valid = true;
  errors.value = { email: "" };

  if (!form.value.email.trim()) {
    errors.value.email = "Email wajib diisi";
    valid = false;
  }
  return valid;
};

const doLogin = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    await authStore.loginMember(form.value);
    if (authStore.data.success) {
      setTimeout(() => {
        window.location.href = "/member/dashboard";
      }, 1000);
    }
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};
</script>
