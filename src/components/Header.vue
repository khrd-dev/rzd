<template>
    <header>
        <nav>
            <router-link to="/" class="logo">My Store</router-link>
            <router-link to="/cart" class="cart">
                <i class="cart-icon">🛒</i>
                <span v-if="cartCount">{{ cartCount }}</span>
            </router-link>
        </nav>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.itemCount);
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f5f5f5;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: auto;
    text-decoration: none;
}

.cart {
    position: relative;
}

.cart-icon {
    font-size: 1.5rem;
}

span {
    position: absolute;
    top: -5px;
    right: -10px;
    height: 1.5rem;
    width: 1.5rem;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 0.8rem;
    text-align: center;
}
</style>
