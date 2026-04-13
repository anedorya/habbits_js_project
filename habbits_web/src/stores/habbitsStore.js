import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_URL = '/habbits';

export const useHabbitsStore = defineStore('habbits', () => {
  const habbitsList = ref([]);
  const searchQuery = ref(''); 
  const loading = ref(false);

  const allHabbits = computed(() => habbitsList.value);
  const currentHabbit = ref(null);
  const isBaseHabbit = (id) => id >= 1 && id <= 10;


  const fetchHabbits = async () => {
    loading.value = true;
    try {
      const response = await axios.get(API_URL, {
        params: { name: searchQuery.value }
      });
      console.log('Ответ сервера:', response.data); 
      habbitsList.value = response.data.data;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      loading.value = false;
    }
  };

const fetchHabbitById = async (id) => {
  loading.value = true;
  try {
    const existing = habbitsList.value.find(h => h.id === Number(id));
    if (existing) {
      currentHabbit.value = existing;
    } else {
      const response = await axios.get(`${API_URL}/${id}`);
      currentHabbit.value = response.data;
    }
  } catch (error) {
    console.error('Привычка не найдена:', error);
    currentHabbit.value = null;
  } finally {
    loading.value = false;
  }
};


  const addHabbit = async (name, desc) => {
    try {
      const response = await axios.post(API_URL, { name, desc });
      habbitsList.value.push(response.data);
    } catch (error) {
      console.error('Ошибка добавления:', error);
    }
  };

  const deleteHabbit = async (id) => {
    if (isBaseHabbit(id)) {
      alert("Вы пытаетесь удалить базовую привычку");
      return;
    }
    try {
      await axios.delete(`${API_URL}/${id}`);
      habbitsList.value = habbitsList.value.filter(h => h.id !== id);
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };


  const updateHabbit = async (id, updatedData) => {
    if (isBaseHabbit(id)) {
      alert("Вы пытаетесь изменить базовую привычку");
      return;
    }

    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedData);
      const index = habbitsList.value.findIndex(h => h.id === id);
      if (index !== -1) habbitsList.value[index] = response.data;
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  return { 
    habbitsList, 
    searchQuery, 
    allHabbits, 
    loading, 
    fetchHabbits, 
    fetchHabbitById,
    addHabbit, 
    deleteHabbit,
    updateHabbit,
    currentHabbit,
    isBaseHabbit, 
  };
});