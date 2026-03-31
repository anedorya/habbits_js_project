import { defineStore } from "pinia";
import { ref, computed } from "vue";


export const usechosenHabbitsStore = defineStore('chosenHabbits', () => {
    const habbitItems = ref([])

    const chooseHabbit = (habbit) => {
        
        console.log('Аргумент:', habbit)

        const chosenHabbit = habbitItems.value.find(item => item.id === habbit.id)
        habbitItems.value.push(habbit)
        // if (chosenHabbit) {
        //     chosenHabbit.quantity +=1
        // } else {
        //     chosenHabbit.value.push({...habbit, quantity: 1})
        // }

        // 
    }

    return {habbitItems, chooseHabbit}
})
