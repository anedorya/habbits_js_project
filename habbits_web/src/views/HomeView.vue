<script setup lang="ts">

import CatalogHabbits from '../components/CatalogHabbits.vue'
import ChosenHabbits from '../components/ChosenHabbits.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-12">
      <ChosenHabbits />
      <hr class="border-gray-200" />
      <CatalogHabbits />

    </div>
  </main>
</template>
