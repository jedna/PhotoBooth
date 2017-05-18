<template>
    <div class="editor-photo">
        <canvas ref="imageCanvas"></canvas>
        <div id="save" class="btn-print">
            <router-link :to="{ name: 'browser-selected', param: {path: path}}">
                <span class="btn btn-warning fa fa-close"></span>
            </router-link>

            <span class="btn btn-info fa fa-image" @click="switchFrame"></span>
            <span class="btn btn-success fa fa-save" @click="savePhoto"></span>
            <span class="btn btn-success fa fa-print" @click="printPhotoWin"></span>
        </div>
    </div>
</template>

<script>
    import ImageComposer from '../ImageComposer'
    const exec = require('child_process').exec

    export default {
        props  : ['path'],
        data   : function () {
            return {
                frames: this.$store.state.frames,
                printer: this.$store.state.printer,
                activeFrame: 0
            }
        },
        mounted: function () {
            console.log('Editor created for ' + this.path)
            this.loadEditor()
        },
        methods: {
            loadEditor () {
                // console.log(this.frames)
                if (this.frames.length) {
                    ImageComposer.drawImage(this.path, this.frames[this.activeFrame].path, this.$refs.imageCanvas)
                } else {
                    alert('Select frame first')
                    this.$router.push({name: 'browser-selected', param: {path: this.path}})
                }
            },
            switchFrame () {
                this.activeFrame = (this.activeFrame + 1) % this.frames.length
                console.log('Switching frames')
                console.log(this.activeFrame)
                this.loadEditor()
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
                let self = this

                ImageComposer.saveImage(this.$refs.imageCanvas, this.path, true, function (photo) {
                    console.log(photo)

                    const {BrowserWindow} = require('electron').remote
                    let win = new BrowserWindow({show: false})
                    win.setMenu(null)
                    win.webContents.on('dom-ready', function () { console.log('dom ready') })
                    win.webContents.on('paint', function () { console.log('paint') })
                    win.webContents.on('did-finish-load', function () {
                        console.log('did finish load')
                        win.webContents.insertCSS('@page {size: 6in 4in margin: 0page-break-inside: avoid} img {height: 4in !important width: 6in !important border: none}')
                        win.show()
                        // small timeout so that print manage to pause js execution
                        setTimeout(function () {
                            win.webContents.print()
                            // self.close()
                            setTimeout(function () {
                                // win.close()
                            }, 2000)
                        }, 500)
                    })
                    win.on('closed', () => {
                        win = null
                        self.$router.push({name: 'browser-selected', path: photo})
                    })

                    win.loadURL('file://' + photo)
                })
                // console.log('No printer active')
            },
            printPhotoWin () {
                console.info('Printing photo.')
                let self = this
                ImageComposer.saveImage(this.$refs.imageCanvas, this.path, true, function (photo) {
                    console.info(photo)
                    let cmd = 'rundll32.exe %SystemRoot%/System32/shimgvw.dll,ImageView_PrintTo /pt "' + photo + '" "' + self.printer + '"'
                    console.info(cmd)
                    exec(cmd, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`)
                            return
                        }
                        console.info(`stdout: ${stdout}`)
                        console.info(`stderr: ${stderr}`)
                        self.$router.push({name: 'browser-selected', path: photo})
                    })
                })
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
        padding: 30px 10px 45px;
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
