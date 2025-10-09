<template>
  <Toast />
  <div class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80">
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-sm mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <Image src="../../../public/images/logo.webp" />
        </div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 text-2xl font-semibold leading-tight text-center w-full"
          >
            Login Page
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
            />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="password1"
              class="text-surface-900 font-medium leading-normal"
              >Password</label
            >

            <Password
              id="password1"
              v-model="form.password"
              placeholder="Password"
              :toggleMask="true"
              :feedback="false"
              input-class="w-full!"
            />
          </div>
        </div>
        <Button
          label="Sign In"
          icon="pi pi-user"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          type="submit"
        >
          <template #icon>
            <i class="pi pi-user text-base! leading-normal!" />
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
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const toast = useToast();
const router = useRouter();

interface LoginForm {
  username: string;
  password: string;
}

const form = ref<LoginForm>({
  username: "",
  password: "",
});

const authStore = useAuthStore();

const doLogin = async () => {
  await authStore.loginMember(form.value);
  if (authStore.data.success) {
    setTimeout(() => {
      router.push("/member/dashboard");
    }, 1000);
  }
};
</script>
