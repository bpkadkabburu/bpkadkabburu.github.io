<template>
    <div id="beranda">
        <Hero />
        <Sambutan />
    </div>
</template>
<script>
import Hero from '../../components/beranda/Hero.vue';
import Sambutan from '../../components/beranda/Sambutan.vue';
export default{
    components:{
    Hero,
    Sambutan,
}
}
</script>