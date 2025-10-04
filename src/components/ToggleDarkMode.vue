<template>
  <div class="p-6">
    <Button label="Toggle Dark Mode" @click="toggleDark" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref, onMounted } from "vue";

const isDark = ref(false);

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle("my-app-dark", isDark.value);
  localStorage.setItem("dark-mode", JSON.stringify(isDark.value));
};

onMounted(() => {
  const saved = localStorage.getItem("dark-mode");
  if (saved) {
    isDark.value = JSON.parse(saved);
    document.body.classList.toggle("my-app-dark", isDark.value);
  }
});
</script>
