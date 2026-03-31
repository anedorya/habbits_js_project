<template>
    <div>
        <h2>Корзина</h2>
        <p v-if="cartStore.cartItems.length === 0">Корзина пуста</p>
            <div v-else>
                <div class="card" v-for="elemCart in cartStore.cartItems" :key="elemCart.id">
			        <h3>{{elemCart.title}}</h3>
                    <p> {{ elemCart.desc }} </p>
                    <p> Цена: {{ elemCart.price }} руб </p>
                    <p> На складе: {{ elemCart.item_quantity }} </p>
                    <p> Количество в корзине: {{ elemCart.quantity }} </p>
                    <div> 
                        <button @click="cartStore.decrementQuantity(elemCart.id)">-</button>
                        <button @click="cartStore.incrementQuantity(elemCart.id)">+</button>
                        <button @click="cartStore.removeFromCart(elemCart.id)">Удалить из корзины</button>
                    </div>

                </div>
                <p>Общая стоимость: {{ cartStore. totalPrice}} руб</p>
            </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

</script>

<style scoped>
    .card {
        border: 1px solid #ccc;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 8px;
    }
</style>
