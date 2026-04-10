<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
    
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span class="text-white font-bold text-xl">✓</span>
          </div>
          <h2 class="text-xl font-extrabold tracking-tight text-gray-800">
            Трекер привычек
          </h2>
        </div>

        <nav class="flex items-center gap-1">
          <RouterLink 
            to="/" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            active-class="bg-indigo-50 text-indigo-600"
            inactive-class="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Главная
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            active-class="bg-indigo-50 text-indigo-600"
            inactive-class="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            О проекте
          </RouterLink>
        </nav>

      </div>
    </header>

    <main class="max-w-6xl mx-auto p-6 md:p-10">
      <RouterView />
    </main>
  </div>
</template>

<style>
  body {
    margin: 0;
  }

</style>