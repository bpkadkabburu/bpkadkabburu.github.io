import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/Index.vue"
import Konversi from "../pages/konversi/Index.vue"
import Transverse from "../pages/transverse/Index.vue"

const routes = [
    {
        path:'/',
        component:Index
    },
    {
        path:'/konversi',
        component:Konversi
    },
    {
        path:'/transverse',
        component:Transverse
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router