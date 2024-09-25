<template>
    <div>
        <Header :cartCount="cartCount" />
        <table v-if="cartItems.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    <th>Общая стоимость</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in cartItems"
                    :key="item.id"
                    class="item"
                >
                    <td>{{ index + 1 }}</td>
                    <td>
                        <img :src="item.image" alt="product" />
                        {{ item.title }}
                    </td>
                    <td>
                        <button @click="decreaseQuantity(item)">-</button>
                        {{ item.quantity }}
                        <button @click="increaseQuantity(item)">+</button>
                    </td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.price * item.quantity }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else class="emptyCart">
            <h3>Корзина пуста</h3>
            <button @click="router.push('/')">Вернуться к покупкам</button>
        </div>
        <div v-if="cartItems.length" class="action">
            <h3>Всего товаров {{ allItemCount }} на сумму ${{ totalPrice }}</h3>
            <button @click="checkout">Оформить заказ</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.itemCount);
const router = useRouter();

const cartItems = cartStore.items;

const increaseQuantity = (item) => {
    cartStore.addItem(item);
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cartStore.removeItem(item.id);
    }
};

const allItemCount = computed(() =>
    cartItems.reduce((total, product) => total + (product.quantity || 0), 0)
);

const totalPrice = computed(() =>
    cartItems
        .reduce(
            (total, product) => total + product.price * (product.quantity || 0),
            0
        )
        .toFixed(2)
);

const checkout = () => {
    alert('Заказ успешно оформлен!');
    cartStore.clearCart();
    router.push('/');
};
</script>
<style scoped>
.item img {
    width: 3rem;
    height: auto;
}
.action {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.emptyCart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: fit-content;
    margin: 0 auto;
    margin-top: 10rem;
}
</style>
