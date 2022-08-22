<template>
  <Navbar/>
  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue';
import AOS from "aos"


export default{
  components:{
    Navbar
  },
  mounted(){
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    })
  }
}
</script>