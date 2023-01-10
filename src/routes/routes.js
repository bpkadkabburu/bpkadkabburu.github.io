import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/beranda/Index.vue"
import Profil from "../pages/profil/Index.vue"
import Konversi from "../pages/konversi/Index.vue"
import Excel2apbd from "../pages/excel2apbd/Index.vue"
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
        path:'/profil/:menu',
        component:Profil,
        name: 'profil',
        meta:{
            title: 'Profil'
        }
    },
    {
        path:'/konversi',
        component:Konversi,
        name:'konversi',
        meta:{
            title: 'Konversi'
        }
    },
    {
        path:'/excel2apbd',
        component:Excel2apbd,
        name:'excel2apbd',
        meta:{
            title: 'Excel2apbd'
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