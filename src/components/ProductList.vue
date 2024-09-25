<template>
    <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
            <img :src="product.image" alt="Product image" />
            <h3>{{ product.title }}</h3>
            <p>\${{ product.price }}</p>
            <button @click="addToCart(product)">Добавить в корзину</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    products: Array,
});
const emit = defineEmits(['addToCart']);

const addToCart = (product) => {
    emit('addToCart', product);
};
</script>

<style scoped>
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}

.product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    width: calc(33.3333% - 0.7rem);
    box-sizing: border-box;
    width: 100%;
}

.product-card img {
    max-width: 100%;
    height: auto;
}

button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
