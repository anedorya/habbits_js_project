<script setup>

import { ref, onMounted } from 'vue';

import Habbit from './Habbit.vue'

import { useHabbitsStore } from '../stores/habbitsStore';
const habbitsStore = useHabbitsStore();

const newHabbitName = ref('');
const newHabbitDesc = ref('');

onMounted(async () => {
  await habbitsStore.fetchHabbits();
});

const onSubmit = () => {
  habbitsStore.addHabbit(newHabbitName.value, newHabbitDesc.value);
  newHabbitName.value = '';
  newHabbitDesc.value = '';
};

</script>


<template>
<div class="space-y-8">
    <h2 class="text-2xl font-bold text-gray-800">Выбери, над какими привычками ты будешь работать</h2>
    <div v-if="habbitsStore.loading" class="flex justify-center py-10 text-indigo-600 font-medium">
      <span class="animate-pulse">Загрузка данных из базы...</span>
      </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" v-else >
        <Habbit 
        v-for="item in habbitsStore.habbitsList" :key="item.id" 
        :habbit="item" 
        />



    </div>
        <form 
          @submit.prevent="onSubmit"
          class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">

          <div class="flex-1 w-full space-y-1">
              <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Название</label>
              <input 
                  v-model="newHabbitName" 
                  class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  type="text" 
                  placeholder="Название привычки" 
                  required 
              />
          </div>
          <div class="flex-1 w-full space-y-1">
              <label class="text-xs font-semibold text-gray-500 uppercase ml-1">Описание</label>
              <input 
                  v-model="newHabbitDesc" 
                  class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  type="text"
                  placeholder="Описание"></input>
          </div>
          <button 
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-100 w-full md:w-auto">
            Добавить привычку
          </button>
        </form>

</div>
</template>

