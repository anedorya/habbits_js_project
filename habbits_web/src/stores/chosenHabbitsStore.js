import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

import { useUserStore } from "./userStore";


export const usechosenHabbitsStore = defineStore('chosenHabbits', () => {
    const habbitItems = ref([])
    const userStore = useUserStore();

    const chooseHabbit = async (habbit) => {
        const userId = userStore.currentUser?.id;

        try {
            // const response = await axios.post(`API_URL/${userId}/habbits/${habbit.id}`);
            const response = await axios.post(`/users/${userId}/habbits/${habbit.id}`);

            const isAlreadyChosen = habbitItems.value.some(item => item.id === habbit.id);
            
            if (!isAlreadyChosen) {
                habbitItems.value.push(habbit);
                console.log('✅ Привычка добавлена в базу и в стор');
            }
        } catch (error) {
            console.error('❌ Ошибка при сохранении привычки:', error.response?.data?.message || error.message);
        }
    }

    const fetchChosenHabbits = async () => {
        const userId = userStore.currentUser?.id;
        if (!userId) return;

        try {
            // Запрашиваем данные юзера (NestJS вернет habbits, если настроены relations)
            const response = await axios.get(`/users/${userId}`);
            // Обновляем локальный список привычками из базы
            habbitItems.value = response.data.habbits || [];
        } catch (error) {
            console.error('Ошибка при загрузке привычек:', error);
        }
    };

    // const chooseHabbit = (habbit) => {
        
    //     console.log('Аргумент:', habbit)

    //     const chosenHabbit = habbitItems.value.find(item => item.id === habbit.id)
    //     habbitItems.value.push(habbit)
    //     // if (chosenHabbit) {
    //     //     chosenHabbit.quantity +=1
    //     // } else {
    //     //     chosenHabbit.value.push({...habbit, quantity: 1})
    //     // }

    //     // 
    // }

const unchooseHabbit = async (habbitId) => {
        try {
            // 1. Отправляем DELETE запрос на бэкенд
            await axios.delete(`/users/${userId}/habbits/${habbitId}`);

            // 2. Убираем привычку из локального массива в сторе
            habbitItems.value = habbitItems.value.filter(item => item.id !== habbitId);
            
            console.log(`✅ Привычка #${habbitId} удалена из базы и стора`);
        } catch (error) {
            console.error('Ошибка при удалении:', error.response?.data?.message);
            // Если на бэкенде сработала наша валидация (привычки нет), 
            // здесь можно вывести уведомление пользователю
        }
        }

    return {habbitItems, chooseHabbit, fetchChosenHabbits}
})
