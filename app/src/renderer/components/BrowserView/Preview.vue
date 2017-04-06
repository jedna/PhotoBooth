<template>
    <div class="col-content">
        <router-link v-if="path" :to="{ name: 'editor', params: {path: path}}" tag="div">
            <img class="img-responsive" :src="path">
        </router-link>
            <!--<img v-else class="img-responsive" src="img/loading.gif">-->
        <div v-else>
            <p>Ahoj</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['path']
    }
</script>

<style scoped lang="less">
    @import '../../assets/less/admin.less';

    .col-content {
        position: absolute;
        top:0;
        bottom:0;
        left: @left-menu-width;
        right:0;
        overflow: hidden;
        align-items: center;
        display: flex;
        justify-content: center;
        text-align: center;

        div {
            width: 100%;
            height: 100%;
        }

        img {
            cursor: pointer;
            height: 100%;
            width: 100%;
            object-fit: contain;
            display: inline-block;
        }
    }


</style>
