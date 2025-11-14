<template>
  <Pie :data="chartData" :options="options" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed } from "vue";
import { Pie } from "vue-chartjs";
const props = defineProps<{
  chartData: any;
}>();
ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = computed(() => {
  if (!props.chartData) {
    return {
      labels: [],
      datasets: [{ data: [] }],
    };
  }

  return {
    labels: props.chartData.labels ?? [],
    datasets: [
      {
        backgroundColor: [
          "#41B883",
          "#FFA239",
          "#FF5656",
          "#8FABD4",
          "#4A70A9",
          "#E46651",
          "#36A2EB",
          "#E67E22",
          "#628141",
          "#8BAE66",
          "#EBD5AB",
        ],
        data: props.chartData.datasets?.[0]?.data ?? [],
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
