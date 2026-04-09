<template>
    <div >
        <div v-if="store.loading">Загрузка...</div>
        <div v-else-if="store.currentHabbit" class="card">
            <h3>Название: {{ store.currentHabbit.name }}</h3>
            <p>Описание: {{ store.currentHabbit.desc }}</p>

        <div v-if="userStore.currentUser.isGoogleConnected" class="time-picker-section">
                    <label for="habit-time">Выберите время для напоминания:</label>
                    <input 
                        type="time" 
                        id="habbit-time" 
                        v-model="selectedTime" 
                        class="time-input"
                    />
                    <button @click="addToCalendar" class="calendar-add-btn">
                        ⏰ Установить в календарь
                    </button>
                </div>



        </div>
        <div v-else>Привычка не найдена</div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHabbitsStore } from '../stores/habbitsStore';
import { useUserStore } from '../stores/userStore'; 

const route = useRoute();
const store = useHabbitsStore();
const userStore = useUserStore();
const API_URL = import.meta.env.VITE_API_URL;
const selectedTime = ref('');

const connectGoogle = () => {
    const habbitId = route.params.id;
    const userId = userStore.currentUser.id;
    window.location.href = `${API_URL}/google-calendar/auth/${userId}?habbitId=${habbitId}`;
};

const addToCalendar = async () => {
    if (!selectedTime.value) {
        alert("Пожалуйста, выберите время");
        return;
    }

    try {
        const userId = userStore.currentUser.id;
        const habbitName = store.currentHabbit.name;

        const response = await fetch(`${API_URL}/google-calendar/add-event/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                habitName: habbitName,
                time: selectedTime.value // Передаем "14:30"
            })
        });


        const data = await response.json();
        if (data.link) {
            alert("Событие добавлено!");
            window.open(data.link, '_blank');
        }
    } catch (e) {
        console.error("Детали ошибки:", e);
        alert("Ошибка добавления");
    }
};

onMounted(async () => {
  store.fetchHabbitById(route.params.id);
  await userStore.checkGoogleStatus();

});
</script>

<style scoped>

</style>


