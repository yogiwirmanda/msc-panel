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
            <component :is="item.icon" class="w-5 h-5 text-gray-600" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          class="flex items-center cursor-pointer text-surface-700 px-4 py-2"
          :href="item.url"
          :target="item.target"
          @click="item.command && item.command({ originalEvent: $event, item })"
        >
          <component :is="item.icon" class="w-5 h-5 text-gray-600" />
          <span class="ml-2">{{ item.label }}</span>
          <ChevronDownIcon
            v-if="item.items"
            class="w-4 h-4 text-primary ml-auto"
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

import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  UserIcon,
  PencilIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/vue/24/outline";

const authStore = useAuthStore();

const logoutAdmin = async () => {
  await authStore.logoutMember();
  router.push("/admin/login");
};

const items = ref<any>([
  {
    label: "Dashboard",
    icon: HomeIcon,
    route: "/admin/dashboard",
  },
  {
    label: "Data",
    icon: BookOpenIcon,
    items: [
      {
        label: "Role",
        icon: PencilIcon,
        route: "/admin/master/role",
      },
      {
        label: "User",
        icon: UserIcon,
        route: "/admin/master/user",
      },
      {
        label: "Member",
        icon: UsersIcon,
        route: "/admin/data/member",
      },
    ],
  },
  {
    label: "Report",
    icon: ChartBarIcon,
    route: "/admin/report",
  },
  {
    label: "Logout",
    icon: ArrowLeftCircleIcon,
    command: logoutAdmin,
  },
]);
</script>
