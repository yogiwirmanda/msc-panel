<template>
  <div class="bg-surface-0 px-6 py-8 md:px-12 lg:px-20">
    <div class="flex items-center flex-col lg:flex-row lg:justify-between">
      <div class="flex items-start flex-col md:flex-row gap-8">
        <img
          src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/pageheading/kathryn.png"
          class="w-[6.42rem] h-[6.42rem]"
        />
        <div class="flex flex-col gap-4">
          <div class="flex items-center">
            <span class="text-surface-900 font-bold text-3xl"
              >Eileithyia Putri Artemis</span
            >
          </div>
          <div class="flex items-center flex-wrap gap-8">
            <div>
              <span class="text-surface-500">Followers</span>
              <div class="text-surface-700 mt-1 text-sm font-semibold">333</div>
            </div>
            <div>
              <span class="text-surface-500">Projects</span>
              <div class="text-surface-700 mt-1 text-sm font-semibold">26</div>
            </div>
            <div>
              <span class="text-surface-500">Collections</span>
              <div class="text-surface-700 mt-1 text-sm font-semibold">17</div>
            </div>
            <div>
              <span class="text-surface-500">Shots</span>
              <div class="text-surface-700 mt-1 text-sm font-semibold">130</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 lg:mt-0 flex items-center gap-4">
        <Button icon="pi pi-bookmark" rounded severity="secondary" />
        <Button icon="pi pi-heart" rounded severity="secondary" />
        <Button icon="pi pi-list" rounded severity="secondary" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
</script>
