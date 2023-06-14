import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/beranda/Index.vue"
import Profil from "../pages/profil/Index.vue"
import Konversi from "../pages/konversi/Index.vue"
import Excel2apbdMurni from "../pages/excel2apbd/Murni.vue"
import Excel2apbdPerubahan from "../pages/excel2apbd/Perubahan.vue"
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
        path:'/excel2apbd/murni',
        component:Excel2apbdMurni,
        name:'excel2apbdmurni',
        meta:{
            title: 'Excel2APBDMurni'
        }
    },
    {
        path:'/excel2apbd/perubahan',
        component:Excel2apbdPerubahan,
        name:'excel2apbdperubahan',
        meta:{
            title: 'Excel2APBDPerubahan'
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