<template>
  <Card>
    <template #content>
      <div class="flex flex-col h-full">
        <nav class="flex flex-col gap-3 flex-1">
          <RouterLink
            to="/member/summary"
            class="flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition mb-3"
            active-class="active-link"
          >
            <PlayCircleIcon class="w-5 h-5" />
            <span>Progress</span>
          </RouterLink>
          <RouterLink
            to="/member/profile"
            class="flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition mb-3"
            active-class="active-link"
          >
            <UsersIcon class="w-5 h-5" />
            <span>Profile</span>
          </RouterLink>

          <!-- <RouterLink
            to="/member/journal"
            class="flex items-center gap-2 p-2 rounded-md hover:bg-surface-200 transition mb-3"
            active-class="active-link"
          >
            <i class="pi pi-book"></i>
            <span>Journal</span>
          </RouterLink> -->
        </nav>

        <div class="mt-auto">
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            class="w-full"
            severity="danger"
            @click="logout"
          >
            <ArrowLeftStartOnRectangleIcon class="w-5 h-5" />
            <span class="text-white font-semibold">Logout</span>
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth";
import {
  ArrowLeftStartOnRectangleIcon,
  PlayCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { UsersIcon } from "@heroicons/vue/24/solid";

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logoutMember();
  router.push("/login");
};
</script>

<style scoped>
.active-link {
  background-color: var(--primary-color);
  color: rgb(10, 10, 10);
}
</style>
