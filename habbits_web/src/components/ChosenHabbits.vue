<template>
    <section class="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"> 
            <span class="text-indigo-600">★</span> 
            Выбранные привычки
        </h2>

        <p v-if="chosenHabbitsStore.chosenHabbits.length === 0" class="text-gray-500 italic">
            Вы пока ничего не выбрали. Посмотрите привычки в каталоге ниже или добавьте свою привычку.
        </p>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="elemCart in chosenHabbitsStore.chosenHabbits" 
                :key="elemCart.id"
                class="border border-gray-200 rounded-2xl hover:border-indigo-300 transition-colors bg-white shadow-sm flex flex-col h-full overflow-hidden"
            >
                <RouterLink 
                    :to="{ name: 'Habbits', params: { id: elemCart.id } }"
                    class="p-5 flex-grow block hover:bg-gray-50/50 transition-colors"
                >
                    <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight hover:text-indigo-600 transition-colors">
                        {{ elemCart.name }}
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        {{ elemCart.desc }}
                    </p>
                </RouterLink>
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


