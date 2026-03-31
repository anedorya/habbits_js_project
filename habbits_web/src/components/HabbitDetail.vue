<template>
    <div >
        <div v-if="store.loading">Загрузка...</div>
        <div v-else-if="store.currentHabbit" class="card">
            <h3>Название: {{ store.currentHabbit.name }}</h3>
            <p>Описание: {{ store.currentHabbit.desc }}</p>
        </div>
        <div v-else>Привычка не найдена</div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHabbitsStore } from '../stores/habbitsStore';

const route = useRoute();
const store = useHabbitsStore();

onMounted(() => {
  store.fetchHabbitById(route.params.id);
});
</script>

<style scoped>

</style>


