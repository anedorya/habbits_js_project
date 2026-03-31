import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useHabbitsStore = defineStore('habbits', () => {

const habbitsList = ref([
  {
    id: 1,
    title: 'Зарядка',
    desc: 'Описание 1',
  },
  {
    id: 2,
    title: 'Тренировка',
    desc: 'Описание 2',
  },
  {
    id: 3,
    title: 'Занятия с детьми',
    desc: 'Описание 3',
    },
    {
    id: 4,
    title: 'Чтение книг',
    desc: 'Описание 4',
    }
])

    const allHabbits = computed(() => habbitsList.value)

    const addHabbit = (title, desc) => {
        habbitsList.value.push({
        id: Date.now(), // Генерируем уникальный ID
        title,
        desc
        })
    }


    return {habbitsList, allHabbits, addHabbit}
})
