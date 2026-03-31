<template>
    <header class='header' :class="themeStore.isDarkMode ? 'header-dark' : ''" >

        <h2>Трекер привычек</h2>
    </header>
</template>

<script setup>
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore()


</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20 px;
}

.header-dark {
    background-color: #333;
    color: #fff;
}

</style>
