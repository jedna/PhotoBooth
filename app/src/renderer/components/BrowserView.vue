<template>
    <div class="">
        <left-menu v-on:select-folder="selectFolder"></left-menu>
        <preview :path="path"></preview>
    </div>
</template>

<script>
    import LeftMenu from './BrowserView/LeftMenu'
    import Preview from './BrowserView/Preview'
    const {dialog} = require('electron').remote
    const {ipcRenderer} = require('electron')
    const fs = require('fs')
    const ImageResizer = require('../ImageResizer')

    export default {
        props     : ['path'],
        data () {
            return {folder: null}
        },
        created () {
//            ipcRenderer.send('watch-folder', this.path);
            ipcRenderer.on('new-photos', this.receive)
        },
        components: {
            LeftMenu,
            Preview
        },
        methods   : {
            selectFolder () {
                console.log('Select folder triggered')
                let path = dialog.showOpenDialog({
                    properties: [
                        'openDirectory'
                    ]
                })
                console.log(path)
                if (path) {
                    console.log('Selecting photos folder' + path[0])
                    // Config.set('photosFolder', path[0]);
                    this.folder = path[0]
                    ipcRenderer.send('watch-folder', this.folder)
                }
            },
            receive (event, arg) {
                let self = this
                this.loading('Discovering images...')
                console.info('Discovering images...')
                // console.info(arg)
                let resizedPhotos = []
                let toResize = []

                arg.forEach((photo) => {
                    if (!fs.existsSync(photo.thumb)) {
                        toResize.push(photo)
                    } else {
                        resizedPhotos.unshift(photo)
                    }
                })

                // console.info(toResize)
                // console.info(resizedPhotos)

                if (toResize.length) {
                    this.loading('Generating thumbnails (0 / ' + toResize.length + ')')
                    console.info('Generating thumbnails (0 / ' + toResize.length + ')')
                    ImageResizer.batchResize(toResize, function (item) {
                        resizedPhotos.unshift(item)
                        self.loading('Generating thumbnails (' + resizedPhotos.length + ' / ' + toResize.length + ')')
                        console.info('Generating thumbnails (' + resizedPhotos.length + ' / ' + toResize.length + ')')

                        if (resizedPhotos.length === toResize.length) {
                            let items = resizedPhotos.sort(function (a, b) {
                                return b.name.localeCompare(a.name)
                            })
                            // console.info(items)
                            self.$store.commit('addPhotos', items)
                            self.loading()
                        }
                    })
                } else {
                    console.info('All resized')
                    this.$store.commit('addPhotos', resizedPhotos)
                    this.loading()
                }
            },
            loading (text) {
                let d = document.getElementById('loading-wrapper')
                let p = document.getElementById('loading-text')
                if (text) {
                    p.innerHTML = text
                    d.style.display = 'block'
                } else {
                    p.innerHTML = ''
                    d.style.display = 'none'
                }
            }
        }
    }

</script>

<style lang="less">
    @import '../assets/less/admin.less';

    ::-webkit-scrollbar {
        display: none;
    }

    body, label, .checkbox label {
        font-weight: 300;
        background-color: #fff;
    }

    /* Overwrite the default to keep the scrollbar always visible */

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
    }
</style>
