<template>
    <div >
        <h2>Выбранные привычки</h2>
        <p v-if="chosenHabbitsStore.habbitItems.length === 0">Вы пока ничего не выбрали</p>
        <div class="habbits" v-else>
            <div class="habbit" v-for="elemCart in chosenHabbitsStore.habbitItems" :key="elemCart.id">
                <h3>{{elemCart.name}}</h3>
                <p> {{elemCart.desc }} </p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import { usechosenHabbitsStore } from '../stores/chosenHabbitsStore';
const chosenHabbitsStore = usechosenHabbitsStore();

onMounted(() => {
    chosenHabbitsStore.fetchChosenHabbits();
});

</script>

<style scoped>
    .habbit {
        width: 200px;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-bottom: 16px;
    }

    .habbits {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        background-color: #d1d1d146;
    }
</style>
