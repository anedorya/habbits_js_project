<template>
    <div class="habbit">
       <RouterLink :to="{ name: 'Habbits', params: { id: habbit.id } }">
       <h3>{{ habbit.name }}</h3>
        </RouterLink>
        <p>Описание: {{ habbit.desc }}</p>  
        <button @click="chosenHabbitsStore.chooseHabbit(habbit)">Выбрать</button>
    </div>
</template>

<script setup>
defineProps({
    habbit: {
        type: Object,
        required: true
    }
})

import { RouterLink } from 'vue-router';
import { usechosenHabbitsStore } from '../stores/chosenHabbitsStore';
const chosenHabbitsStore = usechosenHabbitsStore();


</script>

<style scoped>

.habbit {
    width: 200px;
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
}
</style>
