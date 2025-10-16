<script setup lang="ts">
import { ref } from "vue";
import Carousel from "primevue/carousel";

const products = ref([
  { name: "Laptop", price: 1500, image: "https://via.placeholder.com/150" },
  { name: "Phone", price: 800, image: "https://via.placeholder.com/150" },
  { name: "Tablet", price: 600, image: "https://via.placeholder.com/150" },
  { name: "Headphones", price: 200, image: "https://via.placeholder.com/150" },
]);
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-xl font-bold">PrimeVue Carousel Example</h2>

    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="p-3 text-center border rounded-lg">
          <img :src="slotProps.data.image" alt="product" class="mx-auto mb-2" />
          <h3 class="font-semibold">{{ slotProps.data.name }}</h3>
          <p>${{ slotProps.data.price }}</p>
        </div>
      </template>
    </Carousel>
  </div>
</template>
