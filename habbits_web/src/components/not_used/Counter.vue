<template>
<div>
    <h2> Компонент счетчик</h2>
    <p>Текущее значение {{ counterStore.count }}</p>
    <p>Число у нас четное {{ counterStore.isEven ? 'да' : 'нет'}}</p>
    
    <button :disabled="counterStore.count === 0" @click="counterStore.decrement"> Уменьшить</button>
    <button @click="counterStore.increment"> Увеличить</button>

</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore';

const counterStore = useCounterStore();


</script>

<style scoped>
</style>
