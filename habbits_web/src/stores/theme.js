import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref(false)

    const themeLabel = computed(() => (isDarkMode.value ? 'Темная' : 'Светлая'))
    const toggle = () => {
        isDarkMode.value = !isDarkMode.value
    }

    return { isDarkMode, toggle, themeLabel}
})