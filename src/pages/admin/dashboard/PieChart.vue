<template>
  <Pie :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Laki - Laki", "Perempuan"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651"],
      data: [40, 20],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
</script>
