<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex flex-col justify-center items-center bg-black/50 z-[9999]"
    >
      <ProgressSpinner
        strokeWidth="6"
        style="width: 60px; height: 60px"
        animationDuration=".7s"
      />
      <p class="mt-3 text-white text-lg font-medium">
        {{ message }}
      </p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ProgressSpinner from "primevue/progressspinner";

defineProps<{
  visible: boolean;
  message?: string;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
