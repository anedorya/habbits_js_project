<template>
<div>
    <h2>Каталог товаров</h2>
    <div >
        <p v-if="productsStore.isLoading">Загрузка...</p>
        <div v-else class="products">
            <ProductCard 
            v-for="(item) in productsStore.productList" :key="item.id" 
            :product="item" 
        />
        </div>

    </div>
</div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import { useProductsStore } from '../stores/productsStore';
import { onMounted } from 'vue'

const productsStore = useProductsStore();

onMounted(() => {
    productsStore.fetchProducts();
})
</script>

<style scoped>

.products {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

</style>
