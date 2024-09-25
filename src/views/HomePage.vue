<template>
    <div class="home-page">
        <Header :cartCount="cartCount" />
        <div class="main-content">
            <Sidebar @filter="applyFilter" />
            <ProductList :products="filteredProducts" @addToCart="addToCart" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import ProductList from '@/components/ProductList.vue';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.itemCount);
const products = ref([]);
const filteredProducts = ref([]);

const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    products.value = await response.json();
    filteredProducts.value = JSON.parse(JSON.stringify(products.value));
};

const applyFilter = ({ category, minPrice, maxPrice }) => {
    filteredProducts.value = products.value.filter((product) => {
        return (
            (category === 'all' || product.category === category) &&
            product.price >= minPrice &&
            product.price <= maxPrice
        );
    });
};

const addToCart = (product) => {
    cartStore.addItem(product);
};

onMounted(fetchProducts);
</script>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    display: flex;
    flex: 1;
    padding: 1rem 0;
}
</style>
