<template>
    <section class="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"> 
            <span class="text-indigo-600">★</span> 
            Выбранные привычки
        </h2>

        <p v-if="chosenHabbitsStore.habbitItems.length === 0" class="text-gray-500 italic">
            Вы пока ничего не выбрали. Посмотрите привычки в каталоге ниже или добавьте свою привычку.
        </p>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="elemCart in chosenHabbitsStore.habbitItems" 
                :key="elemCart.id"
                class="bg-white p-6 rounded-2xl shadow-sm border border-white hover:shadow-md transition-all duration-300"
                >
                <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">{{elemCart.name}}</h3>
                <p class="text-gray-600 text-sm leading-relaxed"> {{elemCart.desc }} </p>
            </div>
        </div>
    </section>
</template>


<script setup>
import { onMounted } from 'vue';
import { usechosenHabbitsStore } from '../stores/chosenHabbitsStore';
const chosenHabbitsStore = usechosenHabbitsStore();

onMounted(() => {
    chosenHabbitsStore.fetchChosenHabbits();
});

</script>


