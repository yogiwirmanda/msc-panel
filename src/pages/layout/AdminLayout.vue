<template>
  <div class="layout">
    <Toast />
    <aside class="sidebar">
      <MenuPanel />
    </aside>

    <main class="content">
      <div class="topbar">
        <h2>Panel Admin - MSC</h2>
      </div>
      <div class="page-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import MenuPanel from "./MenuPanel.vue";
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.menu li {
  margin-bottom: 1rem;
}

.content {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: white;
}

.page-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
