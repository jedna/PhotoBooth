<template>
    <div>
        <left-menu v-on:select-folder="selectFolder"></left-menu>
        <preview :path="path"></preview>
        <div class="info-box" v-if="msg">
            <h4>{{ msg }}</h4>
        </div>
    </div>
</template>

<script>
    import LeftMenu from './BrowserView/LeftMenu'
    import Preview from './BrowserView/Preview'
    const {dialog} = require('electron').remote
    const {ipcRenderer} = require('electron')

    let watchingStarted = false

    export default {
        props     : ['path'],
        data () {
            return {folder: this.$store.state.folder, msg: ''}
        },
        created () {
            console.info('Browser created')
        },
        mounted () {
            console.info('Browser mounted')
            ipcRenderer.on('new-photos', this.receive)
            if (this.folder && !watchingStarted) {
                console.info('Start watching', this.folder)
                ipcRenderer.send('watch-folder', this.folder)
                watchingStarted = true
            }
        },
        destroyed () {
            console.info('Browser destroyed')
            ipcRenderer.removeAllListeners('new-photos')
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
                    this.$store.commit('setFolder', path[0])
                    this.$store.commit('setPhotos', [])
                    ipcRenderer.send('watch-folder', path[0])
                    watchingStarted = true
                }
            },
            receive (event, arg) {
                console.info('Discovering images...', arg)
                this.$store.commit('addPhoto', arg[0])
            },
            loading (text) {
                this.msg = text
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

    .info-box {
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        color: #333;
        z-index: 200;
    }
</style>
