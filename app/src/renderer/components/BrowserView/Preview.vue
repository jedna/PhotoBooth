<template>
    <div class="col-content">
        <router-link v-if="path" :to="{ name: 'editor', params: {path: path}}" tag="img" :src="path" class="img-responsive"></router-link>
            <!--<img v-else class="img-responsive" src="img/loading.gif">-->
        <div v-else>
            <img src="../../assets/img/logo.png" width="64" alt="">
            <h3>Select photo</h3>
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
        height: 100vh;
        padding: 20px;
        background: @navbar-inverse-link-active-bg;
        overflow: hidden;
        align-items: center;
        display: flex;
        justify-content: center;
        text-align: center;

        a {
            width: 100%;
            height: 100%;
        }

        img {
            cursor: pointer;
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
            display: inline-block;
        }
    }


</style>
