<template>
    <div class="product">
        <h3>{{ product.title }}</h3>
        <p>Описание: {{ product.desc }}</p>
        <p>Цена: {{ product.price }} руб</p>    
        <button @click="cartStore.addToCart(product)">Купить</button>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})

import { useCartStore } from '../stores/cartStore';
const cartStore = useCartStore();

</script>

<style scoped>

.product {
    width: 200px;
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
}
</style>
