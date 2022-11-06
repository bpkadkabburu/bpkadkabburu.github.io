<template>
    <div id="profil">
        <div style="margin-top: 100px;">
            {{params}}
        </div>
    </div>
</template>
<script>
export default{
    data:() => ({
        params:'',
        split: 3
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