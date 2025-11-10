<template>
  <Toast />
  <div
    class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80 h-screen flex justify-center items-center"
  >
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-sm mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <Image src="/images/logo.webp" />
        <div class="text-surface-900 text-2xl font-semibold text-center">
          Buat Kata Sandi Baru
        </div>
      </div>

      <div class="p-6 text-center" v-if="isExpired">
        <Message severity="error">Link reset password sudah expired</Message>
      </div>

      <form class="space-y-4" @submit.prevent="doChangePassword" v-if="!isExpired">
        <div class="flex flex-col gap-2 w-full relative">
          <label
            for="password"
            class="text-surface-900 font-medium leading-normal"
          >Kata Sandi Baru</label>

          <div class="relative">
            <InputText
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Kata Sandi Baru"
              class="w-full px-3 py-2 shadow-sm rounded-lg pr-10"
              :class="{ 'border-red-500': errors.password }"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              @click="showPassword = !showPassword"
            >
              <EyeIcon v-if="!showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>

          <small v-if="errors.password" class="text-red-500">{{
            errors.password
          }}</small>
        </div>

        <div class="flex flex-col gap-2 w-full relative">
          <label
            for="password_confirm"
            class="text-surface-900 font-medium leading-normal"
          >Konfirmasi Kata Sandi Baru</label>

          <div class="relative">
            <InputText
              id="password_confirm"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="form.password_confirm"
              placeholder="Konfirmasi Kata Sandi Baru"
              class="w-full px-3 py-2 shadow-sm rounded-lg pr-10"
              :class="{ 'border-red-500': errors.password_confirm }"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <EyeIcon v-if="!showConfirmPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>

          <small v-if="errors.password_confirm" class="text-red-500">{{
            errors.password_confirm
          }}</small>
        </div>

        <Button
          :label="loading ? 'Menyimpan...' : 'Simpan'"
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

<script setup lang="ts">
import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import Message from "primevue/message";

const toast = useToast();
const form = ref({
  password: "",
  password_confirm: "",
});

const errors = ref({
  password: "",
  password_confirm: "",
});

const authStore = useAuthStore();
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const router = useRouter();

const expiryTime = ref(Number(router.currentRoute.value.query.expOn));

const now = ref(Date.now());

const isExpired = computed(() => now.value > expiryTime.value);

setInterval(() => {
  now.value = Date.now();
}, 1000);

const validateForm = () => {
  let valid = true;
  return valid;
}

const doChangePassword = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    const response = await authStore.changePassword(String(router.currentRoute.value.query.code), form.value);
    if (response) {
      toast.add({
        severity: "success",
        summary: "Berhasil",
        detail: "Kata sandi berhasil diubah",
        life: 2000,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  } finally {
    loading.value = false;
  }
};
</script>
