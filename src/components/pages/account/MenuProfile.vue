<template>
  <Card>
    <template #content>
      <div class="flex flex-col h-full">
        <nav class="flex flex-col gap-3 flex-1">
          <RouterLink
            to="/member/profile"
            class="flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition"
            active-class="active-link"
          >
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </RouterLink>

          <RouterLink
            to="/member/journal"
            class="flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition"
            active-class="active-link"
          >
            <i class="pi pi-book"></i>
            <span>Journal</span>
          </RouterLink>
        </nav>

        <div class="mt-auto">
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            class="w-full"
            severity="danger"
            @click="logout"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.active-link {
  background-color: var(--primary-color);
  color: rgb(10, 10, 10);
}
</style>
