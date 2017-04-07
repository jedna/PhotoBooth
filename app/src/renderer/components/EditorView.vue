<template>
    <div class="editor-photo" v-if="path">
        <canvas id="imageCanvas" class="img-responsive"></canvas>
        <canvas id="frameCanvas" class="img-responsive"></canvas>
        <div id="save" class="btn-print">
            <span class="btn btn-warning fa fa-close" @click="close"></span>
            <span class="btn btn-info fa fa-image" @click="switchFrame"></span>
            <span class="btn btn-success fa fa-save" @click="savePhoto"></span>
            <span class="btn btn-success fa fa-print" @click="printPhoto"></span>
        </div>
    </div>
</template>

<script>
    export default {
        param: ['path']
    }
</script>

<style lang="less">
    @import '../assets/less/admin.less';

    .editor-photo {
        text-align: center;
        position: fixed;
        top: 0;  left: 0;
        padding: 50px 10px 65px;
        width: 100%;
        height: 100%;
        background-color: #444;
        z-index: 2;
        //display: none;
        //opacity: 0;
        transition: all 1s;

        .btn-print {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 2em;
            border-radius: 0;
        }
    }
</style>
