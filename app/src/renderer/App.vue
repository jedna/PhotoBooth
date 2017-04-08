<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created () {
//            this.$Lazyload.$on('loaded', (listener) => {
//                console.table(this.$Lazyload.performance())
//            })
        },
        methods: {
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    * {
        margin: 0;
        padding: 0;
    }

    html,
    body {
        height: 100%;
    }

    #app {
        z-index: 10;
        /*padding-top: 50 px;*/
        position: absolute;
        /*display: flex;*/
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
