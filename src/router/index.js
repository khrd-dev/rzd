import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CartPage from '@/views/CartPage.vue';
import AuthPage from '@/views/AuthPage.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/cart',
        component: CartPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/auth',
        component: AuthPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/auth');
    } else if (to.path === '/auth' && isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
