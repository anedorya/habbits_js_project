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
<div>
    <h2>Выбери, над какими привычками ты будешь работать</h2>
    <div v-if="habbitsStore.loading">Загрузка данных из базы...</div>
    <div class="habbits" v-else >
        <Habbit 
        v-for="item in habbitsStore.habbitsList" :key="item.id" 
        :habbit="item" 
        />
        
    </div
    </div>
        <form class="form" @submit.prevent="onSubmit">
        <input class="input" v-model="newHabbitName" 
        type="text" 
        placeholder="Название привычки" 
        required />
        <input class="input" v-model="newHabbitDesc" 
        type="text"
        placeholder="Описание"></input>
        <button type="submit">Добавить привычку</button>
        </form>

</div>
</template>



<style scoped>

.habbits {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.form {
  display: flex;
  gap: 12px;              /* Отступы между полями */
  flex-wrap: wrap;
  border-radius: 8px;
}

.textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit; /* Чтобы шрифт был как у остального сайта */
}
</style>
