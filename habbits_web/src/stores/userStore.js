import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // В реальном приложении здесь будет null, пока юзер не залогинится
    const currentUser = ref({
        id: 10, // Тот самый ID, который мы видели в ошибке
        name: 'Default User',
        email: 'main@example.com'
    });

    const setUser = (user) => {
        currentUser.value = user;
    };

    return { currentUser, setUser };
});