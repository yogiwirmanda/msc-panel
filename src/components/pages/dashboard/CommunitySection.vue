<template>
  <section
    class="relative overflow-hidden bg-gradient-to-r bg-purple px-6 py-24 md:px-12 lg:px-20 text-white"
  >
    <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
      <div
        class="flex items-center justify-center w-20 h-20 p-5 rounded-full bg-white/10 backdrop-blur-md shadow-lg"
      >
        <ChatBubbleLeftRightIcon />
      </div>

      <h2
        class="font-extrabold text-4xl md:text-5xl leading-tight tracking-tight drop-shadow-md"
      >
        Bergabunglah ke Forum Diskusi
      </h2>

      <p class="text-lg md:text-xl text-white/90 max-w-2xl">
        Temukan inspirasi, berbagi pengalaman, dan berdiskusi bersama komunitas
        yang peduli dengan pengembangan diri dan kolaborasi.
      </p>

      <!-- <Button
        label="Bergabung Sekarang"
        severity="secondary"
        rounded
        size="large"
        class="bg-secondary hover:bg-secondary px-6 py-3 mt-4 shadow-lg btn-discussion"
      /> -->
    </div>

    <div
      class="absolute -top-16 -left-16 w-48 h-48 bg-pink-400/30 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"
    ></div>
  </section>
</template>

<script lang="ts" setup>
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped>
.btn-discussion {
  background-color: #f6e5e5 !important;
  color: #54275c !important;
}
</style>
