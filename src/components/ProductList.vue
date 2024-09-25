<template>
    <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
            <div class="img-container">
                <img :src="product.image" alt="Product image" />
            </div>

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
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.product-card .img-container {
    max-width: 100%;
    max-height: 10rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.product-card img {
    width: auto;
    max-width: 100%;
    height: 100%;
}

button {
    margin-top: auto;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
