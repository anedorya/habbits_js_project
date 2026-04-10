<template>
    <div class="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 transition-colors bg-white shadow-sm flex flex-col h-full">
        <RouterLink 
            :to="{ name: 'Habbits', params: { id: habbit.id } }"
            class="p-5 flex-grow block hover:bg-gray-50/50 transition-colors"
            >
            <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight hover:text-indigo-600 transition-colors">
            {{ habbit.name }}
            </h3>
                
            <p class="text-gray-600 text-sm leading-relaxed">
            <span class="font-medium text-gray-400"></span>Описание: {{ habbit.desc }}</p>  
        </RouterLink>
        <button @click="chosenHabbitsStore.chooseHabbit(habbit)" 
            class="mt-6 w-full text-indigo-600 font-semibold py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors shrink-0"
            >Выбрать
        </button>

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

