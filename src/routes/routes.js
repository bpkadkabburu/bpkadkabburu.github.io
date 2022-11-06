import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/beranda/Index.vue"
import Profil from "../pages/profil/Index.vue"
import Konversi from "../pages/konversi/Index.vue"
import { useMenuStore } from "../stores/menu"

const routes = [
    {
        path:'/',
        component:Index,
        name:'beranda',
        meta:{
            title: 'Beranda'
        }
    },
    {
        path:'/konversi',
        component:Konversi,
        name:'konversi',
        meta:{
            title: 'konversi'
        }
    },
    {
        path:'/profil/:menu',
        component:Profil,
        name: 'profil',
        meta:{
            title: 'Profil'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const menu = useMenuStore()
    menu.active = to.name
    next()
})

export default router