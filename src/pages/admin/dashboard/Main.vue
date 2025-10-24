<template>
  <div class="bg-surface-50 px-6 py-8 md:px-12 lg:px-20">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-purple shadow-sm p-5 rounded-2xl">
        <div class="flex justify-between gap-4">
          <div class="flex flex-col gap-2">
            <span
              class="text-surface-700 dark:text-surface-300 font-normal leading-tight"
              >Total Member</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!"
            >
              152
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-linear-to-b from-cyan-400 dark:from-cyan-300 to-cyan-600 dark:to-cyan-500 rounded-lg w-10 h-10"
          >
            <UsersIcon />
          </div>
        </div>
      </div>

      <div class="bg-purple shadow-sm p-5 rounded-2xl">
        <div class="flex justify-between gap-4">
          <div class="flex flex-col gap-2">
            <span
              class="text-surface-700 dark:text-surface-300 font-normal leading-tight"
              >Total Journal</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!"
            >
              532
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-linear-to-b from-orange-400 dark:from-orange-300 to-orange-600 dark:to-orange-500 rounded-lg w-10 h-10"
          >
            <BookOpenIcon />
          </div>
        </div>
      </div>

      <div class="bg-purple shadow-sm p-5 rounded-2xl">
        <div class="flex justify-between gap-4">
          <div class="flex flex-col gap-2">
            <span
              class="text-surface-700 dark:text-surface-300 font-normal leading-tight"
              >Total Post</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!"
            >
              28.441
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-linear-to-b from-slate-400 dark:from-slate-300 to-slate-600 dark:to-slate-500 rounded-lg w-10 h-10"
          >
            <ChatBubbleBottomCenterTextIcon />
          </div>
        </div>
      </div>

      <div class="bg-purple shadow-sm p-5 rounded-2xl">
        <div class="flex justify-between gap-4">
          <div class="flex flex-col gap-2">
            <span
              class="text-surface-700 dark:text-surface-300 font-normal leading-tight"
              >Total Comment</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!"
            >
              25.660
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-linear-to-b from-violet-400 dark:from-violet-300 to-violet-600 dark:to-violet-500 rounded-lg w-10 h-10"
          >
            <ChatBubbleLeftRightIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
</script>
