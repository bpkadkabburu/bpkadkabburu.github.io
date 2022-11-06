<template>
  <Navbar/>
  <router-view />
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import AOS from "aos"

export default{
  components:{
    Navbar,
    Footer,
  },
  mounted(){
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    })
  },
  watch:{
    '$route'(to, from){
      document.title = `${to.meta.title} - BPKAD KABUPATEN BURU` || 'BPKAD KABUPATEN BURU'
    }
  }
}
</script>