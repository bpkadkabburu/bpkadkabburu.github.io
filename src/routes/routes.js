import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/beranda/Index.vue"
import Profil from "../pages/profil/Index.vue"
import store from '../stores';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    store.state.menu.active = to.name
    next()
})

export default router