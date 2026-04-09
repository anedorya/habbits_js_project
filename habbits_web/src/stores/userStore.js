import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const currentUser = ref({
        id: 1, 
        name: 'Default User',
        email: 'main@example.com',
        isGoogleConnected: false
    });

    const setUser = (user) => {
        currentUser.value = user;
    };

    const checkGoogleStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/google-calendar/status/${currentUser.value.id}`);
            const data = await response.json();
            currentUser.value.isGoogleConnected = data.isConnected;
        } catch (e) {
            console.error("Ошибка при проверке статуса Google", e);
        }
    };

    return { currentUser, setUser, checkGoogleStatus };
});