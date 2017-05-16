<template>
    <router-link tag="li" :to="{ name: 'browser-selected', params: {path: photo.path}}" exact class="image-thumb">
        <img :class="[isPrinted(photo) ? 'printed' : '']"
             class="img-responsive" v-lazy="photo.thumb" alt="">
    </router-link>

</template>

<script>
    import fs from 'fs'
    import path from 'path'
    const nativeImage = require('electron').nativeImage

    export default {
        props  : ['photo'],
        data () {
            return {
                dataSrc: function () {
                    console.info('dataSrc for ' + this.photo.path)
                    let image = nativeImage.createFromPath(this.photo.path).resize({width: 160})
                    let data = image.toDataURL()
                    image = null
                    return data
                }
            }
        },
        mounted: function () {
//            console.info('image', this.dataSrc())
            console.info('mounted', this.photo)
//            this.$Lazyload.$once('loaded', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
//                console.info('loaded', el, src)
//            })
//            this.$Lazyload.$once('loading', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
//                console.info('loading', el, src)
//            })
        },
        methods: {
            isPrinted (photo) {
                let dir = path.dirname(photo.path) + '/output/'
                let photoPath = dir + photo.name.replace(/(\.[^.]*)?$/, '.printed$1')
                // let photoPath = 'test'

                return fs.existsSync(photoPath)
            }
        },
        computed: {
            dataSrcTemp: function () {
//                let _canvas = document.createElement('canvas')
//                let _img = new Image()
//                _img.src = this.photo.path
//                console.log('Creating canvas')
//                console.log(this.photo.path)
//                console.log(_img)
//                let _thumbSize = 160
//
//                _img.onload = function () {
//                    console.log('Image loaded for canvas')
//                    _canvas.width = Number(_thumbSize)
//                    _canvas.height = Number(_thumbSize)
//                    if (_canvas.getContext) {
//                        let _cntxt = _canvas.getContext('2d')
//                        _cntxt.drawImage(_img, 0, 0, _canvas.width, _canvas.height)
//                        return _canvas.toDataURL()
//                    }
//                }
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
