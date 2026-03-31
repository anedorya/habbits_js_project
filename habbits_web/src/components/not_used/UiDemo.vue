<template>
    <div class="content" :class="themeStore.isDarkMode ? 'dark' : ''">
        <h2>Ui demo</h2>
        <p>Ваша текущая тема сайта {{ themeStore.isDarkMode ? 'Темная' : 'Светлая'}}</p>
        <p>!!! {{ themeStore.themeLabel}}</p>
        <button @click="themeStore.toggle">Сменить тему</button>
        <h3>Значение счетчика сейчас !!!: {{ counterStore.count }}</h3>
    </div>
</template>

<script setup>
import { useThemeStore } from '../stores/theme';
import { useCounterStore } from '../stores/counterStore';

const themeStore = useThemeStore()
const counterStore = useCounterStore();

</script>

<style scoped>
.content {
    padding: 20 px;
}

.dark {
    background-color: #333;
    color: #fff;
    }
</style>
