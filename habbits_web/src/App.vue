<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/Header.vue'
</script>

<template>
  <div >
    <Header/>
    <p></p>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
  <RouterView />
  </div>
  
</template>

<style scoped>
  .content {
    padding: 32px;
  }

</style>