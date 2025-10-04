<template>
  <div class="card w-full bg-secondary">
    <Menubar :model="items">
      <template #start>
        <Image src="../../../public/images/logo.webp" />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <RouterLink
          v-if="item.to"
          v-bind="props.action"
          :to="item.to"
          class="flex items-center"
        >
          <span>{{ item.label }}</span>
        </RouterLink>

        <a
          v-else
          v-bind="props.action"
          class="flex items-center"
          @click="item.command && item.command($event)"
        >
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import Avatar from "primevue/avatar";
import Image from "primevue/image";
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/member/dashboard",
  },
  {
    label: "Profile",
    icon: "pi pi-user",
    to: "/member/profile",
  },
]);
</script>
<style>
.p-menubar.p-component {
  background-color: transparent;
}
</style>
