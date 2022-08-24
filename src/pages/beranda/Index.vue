<template>
    <div id="beranda">
        <Hero />
        <Sambutan />
        <Unit />
    </div>
</template>
<script>
import Hero from '../../components/beranda/Hero.vue';
import Sambutan from '../../components/beranda/Sambutan.vue';
import Unit from '../../components/beranda/Unit.vue';
export default{
    components:{
        Hero,
        Sambutan,
        Unit
    }
}
</script>