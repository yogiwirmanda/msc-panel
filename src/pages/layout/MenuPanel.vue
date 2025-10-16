<template>
  <div class="card flex justify-center">
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
import PanelMenu from "primevue/panelmenu";
import { ref } from "vue";

const items = ref([
  {
    label: "Master",
    icon: "pi pi-notebook",
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
    ],
  },
  {
    label: "Data",
    icon: "pi pi-notebook",
    items: [
      {
        label: "Member",
        icon: "pi pi-users",
        route: "/admin/data/member",
      },
      {
        label: "Testimoni",
        icon: "pi pi-star",
        route: "/admin/data/testimoni",
      },
    ],
  },
]);
</script>
