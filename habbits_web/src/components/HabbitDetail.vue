<template>
    <div class="max-w-3xl mx-auto py-8 px-4">

        <button @click="$router.back()" class="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
        ← Назад
        </button>

        <div v-if="store.loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            Загрузка...

        </div>
    <div v-else-if="store.currentHabbit" class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Верхняя часть с названием -->
      <div class="p-8 border-b border-gray-50 bg-gradient-to-r from-white to-indigo-50/30">
        <div class="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          Детали привычки
        </div>
        <h3 class="text-3xl font-extrabold text-gray-900 leading-tight">
          {{ store.currentHabbit.name }}
        </h3>
      </div>

    <div class="p-8">
        <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Описание</h4>
        <p class="text-lg text-gray-600 leading-relaxed italic">
          « {{ store.currentHabbit.desc }} »
        </p>
    </div>

      <!-- Секция Google Календаря -->
      <div class="p-8 bg-gray-50/50 border-t border-gray-100">
        <div v-if="userStore.currentUser.isGoogleConnected" class="space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <h4 class="font-bold text-gray-800 flex items-center gap-2">
                📅 Google Календарь
              </h4>
              <p class="text-sm text-gray-500">Выберите время для ежедневного напоминания</p>
            </div>
            
            <div class="flex items-center gap-3">
              <input 
                type="time" 
                id="habbit-time" 
                v-model="selectedTime" 
                class="px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium text-gray-700"
              />
              <button 
                @click="addToCalendar" 
                class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                <span>⏰</span> Установить
              </button>
            </div>
          </div>
        </div>

        <!-- Если Google не подключен -->
        <div v-else class="text-center py-4">
          <p class="text-gray-600 mb-4">Подключите календарь, чтобы не пропускать занятия</p>
          <button 
            @click="connectGoogle"
            class="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-all shadow-sm"
          >
            <img src="https://google.com" class="w-4 h-4" alt="Google" />
            Подключить Google Календарь
          </button>
        </div>
      </div>


      <!-- Секция управления (Удалить/Редактировать) -->
      <div class="p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
        <button 
            @click="handleUnchoose" 
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95"
        >
            <span>🚫</span> Перестать отслеживать
        </button>

        <button 
          @click="handleDelete" 
          :disabled="store.isBaseHabbit(store.currentHabbit.id)"
          :class="[
            'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all',
            store.isBaseHabbit(store.currentHabbit.id) 
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed' 
              : 'bg-red-50 text-red-600 hover:bg-red-100 active:scale-95'
          ]"
          :title="store.isBaseHabbit(store.currentHabbit.id) ? 'Эту привычку нельзя удалить' : ''"
        >
          <span>🗑️</span> Удалить привычку
        </button>
      </div>

    </div>

    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
      <p class="text-xl text-gray-400 font-medium">Привычка не найдена 😕</p>
      <RouterLink to="/" class="mt-4 inline-block text-indigo-600 font-semibold hover:underline">Вернуться на главную</RouterLink>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHabbitsStore } from '../stores/habbitsStore';
import { useUserStore } from '../stores/userStore'; 
import { usechosenHabbitsStore } from '../stores/chosenHabbitsStore';


const route = useRoute();
const router = useRouter();
const store = useHabbitsStore();
const userStore = useUserStore();
const chosenHabbitsStore = usechosenHabbitsStore();
const API_URL = import.meta.env.VITE_API_URL;
const selectedTime = ref('');

const handleUnchoose = async () => {
  if (confirm('Вы уверены, что хотите убрать эту привычку из своего списка?')) {
    const userId = userStore.currentUser.id;
    const habbitId = store.currentHabbit.id;
    
    await chosenHabbitsStore.unchooseHabbit(userId, habbitId);
    router.push('/'); 
  }
};

const handleDelete = async () => {
    if (confirm('Вы уверены, что хотите удалить эту привычку?')) {
        await store.deleteHabbit(store.currentHabbit.id);
        // Если в сторе нет ошибки (удаление прошло успешно), возвращаемся назад
        router.push('/');
    }
};

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


