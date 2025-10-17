<template>
  <div class="card w-full bg-secondary">
    <Menubar class="!bg-transparent !border-none">
      <template #start>
        <RouterLink
          key="homepage"
          to="/member/dashboard"
          class="flex items-center text-black hover:text-primary transition"
        >
          <Image src="/images/logo.webp" />
        </RouterLink>
      </template>

      <template #end>
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="flex items-center text-black hover:text-primary transition"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 mr-2 text-black hover:text-primary"
            />
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>

        <button class="md:hidden text-black text-2xl ml-4" @click="toggleMenu">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </template>
    </Menubar>

    <transition name="fade">
      <div
        v-if="menuOpen"
        class="md:hidden bg-secondary px-6 py-4 flex flex-col gap-4 border-t border-white/10"
      >
        <RouterLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="flex items-center text-black hover:text-primary transition"
          @click="menuOpen = false"
        >
          <component
            :is="item.icon"
            class="w-5 h-5 mr-2 text-black hover:text-primary"
          />
          <span>{{ item.label }}</span>
        </RouterLink>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Image from "primevue/image";
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { HomeIcon, UserIcon, Bars3Icon } from "@heroicons/vue/24/outline";

const items = ref([
  { label: "Home", icon: HomeIcon, to: "/member/dashboard" },
  { label: "Profile", icon: UserIcon, to: "/member/profile" },
]);

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
.p-menubar {
  background-color: transparent;
  border: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
