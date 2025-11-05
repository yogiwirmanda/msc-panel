<template>
  <Pie :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Remaja", "Dewasa", "Lansia"],
  datasets: [
    {
      backgroundColor: ["#a60a3d", "#c4a54a", "#eee7d3"],
      data: [30, 10, 2],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
