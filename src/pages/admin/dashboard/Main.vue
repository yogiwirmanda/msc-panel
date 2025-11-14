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
              {{ dashboardData?.summary?.total_member }}
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
              {{ dashboardData?.summary?.total_journal }}
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
              >Total Threads</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!"
            >
              {{ dashboardData?.summary?.total_threads }}
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
              {{ dashboardData?.summary?.total_comments }}
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
    <div class="grid grid-cols-2 gap-5 mt-10 items-center">
      <Card class="card-graph" v-if="dashboardData?.charts?.member_by_genders">
        <template #title>Jenis Kelamin</template>
        <template #content>
          <PieChart :chart-data="dashboardData?.charts?.member_by_genders" />
        </template>
      </Card>
      <Card class="card-graph" v-if="dashboardData?.charts?.member_by_ages">
        <template #title>Usia</template>
        <template #content>
          <PieChart :chart-data="dashboardData?.charts?.member_by_ages" />
        </template>
      </Card>
      <Card
        class="card-graph"
        v-if="dashboardData?.charts?.member_by_professions"
      >
        <template #title>Usia</template>
        <template #content>
          <PieChart
            :chart-data="dashboardData?.charts?.member_by_professions"
          />
        </template>
      </Card>
      <Card
        class="card-graph"
        v-if="dashboardData?.charts?.member_by_educations"
      >
        <template #title>Usia</template>
        <template #content>
          <PieChart :chart-data="dashboardData?.charts?.member_by_educations" />
        </template>
      </Card>
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
import { useDashboardStore } from "../../../stores/dashboardStore";
import { onMounted, ref } from "vue";
import PieChart from "./PieChart.vue";
import Card from "primevue/card";

const dashboardStore = useDashboardStore();
const dashboardData = ref<any>({});

const loadDashboard = async () => {
  await dashboardStore.getDashboard(1);
  dashboardData.value = dashboardStore.dashboards.data;
};

onMounted(() => {
  loadDashboard();
});
</script>
