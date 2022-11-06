<template>
    <header id="header" class="header fixed-top">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
            <a href="/" class="logo d-flex align-items-center">
                <img :src="bpkadLogo" alt="Kabupaten Buru Logo">
            </a>
            <nav id="navbar" class="navbar">
                <ul>
                    <li><router-link :to="{name:'beranda'}" class="nav-link" :class="[menuStore.active === 'beranda' ? 'active' : '']">Beranda</router-link></li>
                    <li class="dropdown">
                        <a href="#" :class="[menuStore.active === 'profil' ? 'active' : '']">
                            <span>Profil</span>
                            <i class="bi bi-chevron-down"></i>
                        </a>
                        <ul>
                            <li>
                                <router-link :to="{name:'profil', params:{menu:'visi-misi'}}"><span>Visi & Misi</span></router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'profil', params:{menu:'tugas-pokok-dan-fungsi'}}"><span>Tugas Pokok dan Fungsi</span></router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'profil', params:{menu:'struktur-organisasi'}}"><span>Struktur Organisasi</span></router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">
                            <span>Organisasi</span>
                            <i class="bi bi-chevron-down"></i>
                        </a>
                        <ul>
                            <li>
                                <router-link to="#"><span>Sekretariat</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Bidang Anggaran</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Bidang Perbendaharaan</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Bidang Akuntansi</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Bidang Aset Daerah</span></router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">
                            <span>Informasi Publik</span>
                            <i class="bi bi-chevron-down"></i>
                        </a>
                        <ul>
                            <li>
                                <router-link to="#"><span>APBD</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Laporan Realisasi</span></router-link>
                            </li>
                            <li>
                                <router-link to="#"><span>Laporan Keuangan</span></router-link>
                            </li>
                        </ul>
                    </li>
                    <li><router-link to="#" class="nav-link">Kontak</router-link></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
        </div>
    </header>
</template>
<script>
import { mapStores } from "pinia";
import { useMenuStore } from "../stores/menu";
import bpkadLogo from "../assets/images/Logo.gif"
import banner from "../assets/images/Banner.jpg"
export default{
    data:() => ({
        bpkadLogo,
        banner
    }),
    computed:{
        ...mapStores(useMenuStore)
    }
}
</script>