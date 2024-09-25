<template>
    <aside>
        <div>
            <h2 class="title">Фильтр</h2>
            <label for="category">Выберите категорию:</label>
            <select id="category" v-model="selectedCategory">
                <option value="all">Все категории</option>
                <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                >
                    {{ category }}
                </option>
            </select>
        </div>
        <div class="field-container">
            <div>
                <label for="min-price">Мин. цена:</label>
                <input type="number" id="min-price" v-model="minPrice" />
            </div>
            <div>
                <label for="max-price">Макс. цена:</label>
                <input type="number" id="max-price" v-model="maxPrice" />
            </div>
        </div>

        <div class="action">
            <button @click="resetFilters">Сбросить</button>
            <button @click="applyFilters">Применить</button>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['filter']);

const categories = ref([]);
const selectedCategory = ref('all');
const minPrice = ref(0);
const maxPrice = ref(1000);

onMounted(async () => {
    const response = await fetch(
        'https://fakestoreapi.com/products/categories'
    );
    categories.value = await response.json();
});

const applyFilters = () => {
    const filterData = {
        category: selectedCategory.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
    };
    emit('filter', filterData);
};

const resetFilters = () => {
    selectedCategory.value = 'all';
    minPrice.value = 0;
    maxPrice.value = 1000;
    applyFilters();
};
</script>

<style scoped>
.title {
    margin-bottom: 2rem;
}
aside {
    padding: 1rem;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
    margin-right: 1rem;
    max-width: 20rem;
    width: 100%;
    color: black;
}

.field-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
}

.action {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input,
select {
    margin-bottom: 1rem;
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}
</style>
