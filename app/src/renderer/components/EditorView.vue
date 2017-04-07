<template>
    <div class="editor-photo">
        <canvas ref="imageCanvas"></canvas>
        <canvas ref="frameCanvas"></canvas>
        <div id="save" class="btn-print">
            <router-link :to="{ name: 'browser-selected', param: {path: path}}">
                <span class="btn btn-warning fa fa-close"></span>
            </router-link>

            <span class="btn btn-info fa fa-image" @click="switchFrame"></span>
            <span class="btn btn-success fa fa-save" @click="savePhoto"></span>
            <span class="btn btn-success fa fa-print" @click="printPhoto"></span>
        </div>
    </div>
</template>

<script>
    import ImageComposer from '../ImageComposer'

    export default {
        props  : ['path'],
        data   : function () {
            return {
                frames: this.$store.state.frames
            }
        },
        mounted: function () {
            console.log('Editor created for ' + this.path)
            if (this.frames.length) {
                ImageComposer.drawImage(this.path, this.frames[0].path, this.$refs.imageCanvas)
            } else {
                alert('Select frame first')
                this.$router.push({name: 'browser-selected', param: {path: this.path}})
            }
        },
        methods: {
            switchFrame () {
                this.frame = (this.frame + 1) % this.frames.length
                console.log('Switching frames')
                console.log(this.frame)
                this.loadPhoto(this.photo)
                // ImageComposer.enhancePhoto()
            },
            savePhoto () {
                console.log('Saving photo.')
                let self = this
                ImageComposer.saveImage(this.$refs.imageCanvas, this.path, false, function (path) {
                    // if (path) {
                    self.$router.push({name: 'browser'})
                    // }
                })
            },
            printPhoto () {
                console.log('Printing photo.')
                // let self = this

                // var objShell = new ActiveXObject("Shell.Application")
                // objShell.ShellExecute('c:\windows\system32\shimgvw.dll,ImageView_PrintTo /pt '+path+' "Microsoft Print to PDF"')
                ImageComposer.saveImage(this.photo, true, function (photo) {
                    console.log(photo)

                    const {BrowserWindow} = require('electron').remote
                    let win = new BrowserWindow({show: false})
                    win.setMenu(null)
                    win.webContents.on('dom-ready', function () {
                        win.webContents.insertCSS('@page {size: 6in 4in margin: 0page-break-inside: avoid} img {height: 4in !important width: 6in !important border: none}')
                        win.show()
                        win.webContents.print()
                        // small timeout so that print manage to pause js execution
                        setTimeout(function () {
                            // self.close()
                            // win.close()
                        }, 500)
                    })
                    win.on('closed', () => {
                        win = null
                    })

                    win.loadURL('file://' + photo)
                    // objShell.ShellExecute('c:\windows\system32\shimgvw.dll,ImageView_PrintTo /pt '+path.resolve(photo)+' "Microsoft Print to PDF"')
                })
                // console.log('No printer active')
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/less/admin.less';

    .editor-photo {
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        padding: 50px 10px 65px;
        width: 100%;
        height: 100%;
        background-color: #444;
        z-index: 2;
        //display: none;
        //opacity: 0;
        transition: all 1s;

        canvas {
            max-width: 100%;
            max-height: 100%;
        }

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
