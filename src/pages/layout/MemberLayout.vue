<script setup lang="ts">
import Image from "primevue/image";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import Menu from "../../components/pages/Menu.vue";

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <div class="auth-layout">
    <header
      class="bg-secondary text-black p-4 flex justify-between items-center"
    >
      <Menu />
    </header>

    <main class="container mx-auto max-w-[1920px]">
      <RouterView />
    </main>

    <footer
      class="bg-purple-dark text-white p-4 flex justify-center items-center"
    >
      <Image src="../../../public/images/logo.webp" />
    </footer>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
