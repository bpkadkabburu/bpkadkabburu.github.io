<template>
    <div id="profil">
        <div>
            {{params}}
        </div>
    </div>
</template>
<script>
export default{
    data:() => ({
        params:''
    }),
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