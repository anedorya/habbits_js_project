import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

import { useUserStore } from "./userStore";


export const usechosenHabbitsStore = defineStore('chosenHabbits', () => {
    const chosenHabbits = ref([])
    const userStore = useUserStore();
    const userId = userStore.currentUser?.id;

    const chooseHabbit = async (habbit) => {
        try {
            const response = await axios.post(`/users/${userId}/habbits/${habbit.id}`);

            const isAlreadyChosen = chosenHabbits.value.some(item => item.id === habbit.id);
            
            if (!isAlreadyChosen) {
                chosenHabbits.value.push(habbit);
                console.log('✅ Привычка добавлена в базу и в стор');
            }
        } catch (error) {
            console.error('❌ Ошибка при сохранении привычки:', error.response?.data?.message || error.message);
        }
    }

    const fetchChosenHabbits = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(`/users/${userId}`);
            chosenHabbits.value = response.data.habbits || [];
        } catch (error) {
            console.error('Ошибка при загрузке привычек:', error);
        }
    };

    const unchooseHabbit = async (userId, habbitId) => {
        try {
            await axios.delete(`/users/${userId}/habbits/${habbitId}`);
            
            if (chosenHabbits.value) {
            chosenHabbits.value = chosenHabbits.value.filter(h => h.id !== habbitId);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Ошибка при отвязке привычки:', error.response?.data || error.message);
            return { success: false };
        }
    };

    return {chosenHabbits, chooseHabbit, unchooseHabbit, fetchChosenHabbits}
})
