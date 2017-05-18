<template>
    <router-link tag="li" :to="{ name: 'browser-selected', params: {path: photo.path}}" exact class="image-thumb">
        <img :class="[isPrinted(photo) ? 'printed' : '']"
             class="img-responsive" v-lazy="'file://' + photo.thumb" alt="">
    </router-link>

</template>

<script>
    import fs from 'fs'
    import path from 'path'

    export default {
        props  : ['photo'],
        methods: {
            isPrinted (photo) {
                let dir = path.dirname(photo.path) + '/output/'
                let photoPath = dir + photo.name.replace(/(\.[^.]*)?$/, '.printed$1')
                // let photoPath = 'test'

                return fs.existsSync(photoPath)
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/less/admin.less';

    .image-thumb img {
        cursor: pointer;
        display: inline-block;
        padding: 1em 1.5em;
        border-top-right-radius: @border-radius-base;
        border-bottom-right-radius: @border-radius-base;
        font-size: .8em;
        color: @navbar-inverse-link-color;
    }

    .image-thumb img:hover {
        background-color: @navbar-inverse-link-active-bg;
        color: @navbar-inverse-link-active-color
    }

    .router-link-active.image-thumb img {
        background-color: @navbar-inverse-link-active-bg;
        color: @navbar-inverse-link-active-color
    }

    .image-thumb img.printed {
        border-left: 3px solid #639698;
    }
</style>
