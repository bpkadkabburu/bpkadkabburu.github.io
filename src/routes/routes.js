import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/beranda/Index.vue"

const routes = [
    {
        path:'/',
        component:Index
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router