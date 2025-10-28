<template>
  <Image src="/images/logo.webp" />
  <div class="card flex justify-center mt-5">
    <PanelMenu :model="items" class="w-full md:w-80">
      <template #item="{ item }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            class="flex items-center cursor-pointer text-surface-700 px-4 py-2"
            :href="href"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          class="flex items-center cursor-pointer text-surface-700 px-4 py-2"
          :href="item.url"
          :target="item.target"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span
            v-if="item.items"
            class="pi pi-angle-down text-primary ml-auto"
          />
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<script setup lang="ts">
import Image from "primevue/image";
import PanelMenu from "primevue/panelmenu";
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import router from "../../router";

const authStore = useAuthStore();

const logoutAdmin = async () => {
  await authStore.logoutMember();
  router.push("/admin/login");
};

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/admin/dashboard",
  },
  {
    label: "Data",
    icon: "pi pi-book",
    items: [
      {
        label: "Role",
        icon: "pi pi-pencil",
        route: "/admin/master/role",
      },
      {
        label: "User",
        icon: "pi pi-user",
        route: "/admin/master/user",
      },
      {
        label: "Member",
        icon: "pi pi-users",
        route: "/admin/data/member",
      },
    ],
  },
  {
    label: "Report",
    icon: "pi pi-notes",
    route: "/admin/report",
  },
  {
    label: "Logout",
    icon: "pi pi-logout",
    command: logoutAdmin,
  },
]);
</script>
