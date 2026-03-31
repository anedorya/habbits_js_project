import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const isEven = computed(() => count.value % 2 === 0)

    const increment = () => {
        count.value++
    }


    const decrement = () => {
        if (count.value > 0) {
            count.value--
        }
    }

    return { count, isEven, increment, decrement}
})
