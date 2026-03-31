<template>
<div>
    <h2> Информация про счетчик</h2>
    <p>Значение счетчика сейчас {{ counterStore.count }}</p>


</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore';

const counterStore = useCounterStore();


</script>

<style scoped>
</style>
