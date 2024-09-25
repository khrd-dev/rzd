<template>
    <form @submit.prevent="login">
        <div class="form-container">
            <h2>ФОРМА АВТОРИЗАЦИИ</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit" class="submit-btn">Войти</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const login = () => {
    if (email.value && password.value) {
        authStore.login();
        router.push('/');
    } else {
        alert('Пожалуйста, заполните все поля');
    }
};
</script>

<style scoped>
form {
    width: 100%;
    padding-top: 5rem;
}
h2 {
    text-align: center;
}
.field {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.submit-btn {
    margin-top: 2rem;
    width: fit-content;
}
.form-container {
    width: 25rem;
    padding: 2rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
}
</style>
