<template>
    <div id="profil">
        <Breadcrumb />
        <div>
            {{params}}
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
export default{
    data:() => ({
        params:''
    }),
    components:{
        Breadcrumb
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                this.getParam(toParams)
            },
            {immediate: true}
        )
    },
    methods:{
        getParam(to){
            this.params = to.menu
        }
    }
}
</script>