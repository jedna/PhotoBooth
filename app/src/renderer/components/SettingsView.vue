<template>
    <div class="settings row">
        <div class="col-sm-12">
            <router-link :to="{ name: 'browser' }">
                <a class="close">&times;</a>
            </router-link>
            
            <h2>Frames</h2>
            <div class="row">
                <div class="col-sm-3">
                    <div class="frame" :class="[frames[0] ? 'active' : '']">
                        <div class="frame-header">
                            <strong>Frame #1</strong>
                        </div>
                        <template v-if="frames[0]">
                            <img :src="frames[0].path" class="img-responsive" alt="">
                            <div class="frame-footer">
                                <a @click="removeFrame(0)">Discard frame</a>
                            </div>
                        </template>
                        <div v-else class="frame-footer">
                            <div class="frame-input">
                                <span class="input-placeholder"></span>
                                <span @click="selectFrame(0)" class="input-label">Select frame</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="frame" :class="[frames[1] ? 'active' : '']">
                        <div class="frame-header">
                            <strong>Frame #2</strong>
                        </div>
                        <template v-if="frames[1]">
                            <img :src="frames[1].path" class="img-responsive" alt="">
                            <div class="frame-footer">
                                <a @click="removeFrame(1)">Discard frame</a>
                            </div>
                        </template>
                        <div v-else class="frame-footer">
                            <div class="frame-input">
                                <span class="input-placeholder"></span>
                                <span @click="selectFrame(1)" class="input-label">Select frame</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const {dialog} = require('electron').remote

    export default {
        props  : ['path'],
        data   : function () {
            return {
                frames: this.$store.state.frames
            }
        },
        methods: {
            selectFrame: function (id) {
                console.log('Select frame clicked: ' + id)
                let path = dialog.showOpenDialog({
                    properties: [
                        'openFile'
                    ],
                    filters: [
                        {name: 'Images', extensions: ['jpg', 'png', 'gif']}
                    ]
                })
                console.log(path)
                if (path) {
                    this.$store.commit('addFrame', {id: id, path: path[0]})
                }
                // console.log(this.frames[id])
            },
            removeFrame: function (id) {
                console.log('Remove frame clicked: ' + id)
                this.$store.commit('removeFrame', id)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/less/admin.less';

    .settings {
        z-index: 200;
        padding: 2em;
    }

    a.close {
        font-weight: normal;
        padding: .5em;
        font-size: 3em;
    }

    .frame {
        position: relative;
        margin-bottom: .75em;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        text-align: center;

        &.active {
            border-color: #81C685 !important;
        }

        img {
            max-height: 250px;
        }

        .frame-header {
            padding: .75em 1.25em;
            background-color: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;

            .active& {
                background-color: #81C685 !important;
                border-color: #69a16c !important;
            }
        }

        .frame-info {
            padding: 1.25em;
        }

        .frame-footer {
            padding: .75em 1.25em;
            background-color: #f5f5f5;
            border-top: 1px solid #e5e5e5;
        }

        .frame-input {
            position: relative;
            display: inline;
            padding-left: 1.5em;
            color: #555;
            cursor: pointer;

        }

    }

    .input-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 2em;
        height: 2em;
        font-size: 85%;
        line-height: 2em;
        color: #eee;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: #eee no-repeat center center;
        -webkit-background-size: 50% 50%;
        background-size: 50% 50%;

        .active & {
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=);
            background-color: #81C685 !important;
        }
    }

    .input-label {
        position: relative;
        top: .3em;
        display: inline-block;
        margin: 0 0 .5em 1em;
    }
</style>
