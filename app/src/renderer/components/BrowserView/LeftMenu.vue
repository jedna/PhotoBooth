<template>
    <div class="col-menu-wrapper">
        <div class="col-menu-bg"></div>
        <div class="col-menu">
            <div class="dropdown header">
                <a class="navbar-brand" href="#"><img src="./assets/logo.png" alt=""></a>
                <a class="settings btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="true">
                    <span class="fa fa-bars"></span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="#" @click="this.$parent.show('settings')">Settings</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#" @click="selectFolder()">Select folder</a></li>
                </ul>
                <span class="clearfix"></span>
            </div>

            <ul class="list-unstyled photo-list">
                <li id="loading-wrapper" class="text-center loader" style="display: none">
                    <img src="./assets/logo.png">
                    <p id="loading-text" class="loading_text">{{msg}}</p>
                </li>
                <menu-photo-item v-for="photo in photos" :photo="photo" :key="photo.path"></menu-photo-item>
            </ul>
        </div>
    </div>
</template>

<script>
    import MenuPhotoItem from './MenuPhotoItem'

    export default {
        // props: ['photos'],
        data () {
            return {
                msg: 'Test',
                photos: this.$store.state.photos
            }
        },
        methods: {
            selectFolder () {
                console.info('Dispatching selectFolder event')
                this.$emit('select-folder')
            }
        },
        components: {
            MenuPhotoItem
        }
    }
</script>

<style lang="less">
    @import '../../assets/less/admin.less';

    .col-menu-bg {
        position: fixed;
        top: 0;
        bottom: 0;
        width: @left-menu-width;
        background-color: @navbar-inverse-bg;
        pointer-events: none;
        /*visibility: hidden;*/
        /*opacity: 0;*/
        /*transform: translateX(-@left-menu-width);*/
        transition: visibility 0s .12s linear, opacity .12s ease-in, transform .12s ease-in;
        z-index: 0;
    }

    .col-menu {
        position: relative;
        float: left;
        width: @left-menu-width;
        height: 100vh;
        /*pointer-events: none;*/
        /*visibility: hidden;*/
        /*opacity: 0;*/
        /*transform: scale(.8);*/
        transition: visibility 0s .12s linear, opacity .12s ease-in, transform .12s ease-in;
        z-index: 10;
    }

    .photo-list {
        padding-top: @brand-height;
        margin: 0;
        overflow: scroll;
        height: 100vh;
        z-index: 100;
    }

    .header {
        width: @left-menu-width;
        padding: .5em;
        z-index: 10;
        border-bottom: 1px solid #333;
        position: fixed;
        height: @brand-height;
        background-color: @navbar-inverse-bg;

        .settings {
            float: right;
            margin-top: .5em;
            color: #fff;
        }
    }

    .navbar-brand {
        padding: 10px;

        &>img {
              height: 100%;
              padding: 0px; /* firefox bug fix */
              width: auto;
          }

    }

    #select_folder {
        margin: 25% auto 0;
    }

    .loader {
        color: #ddd;
        z-index: 1;
        font-size: .9em;

        img {
            width: 50%;
        }
    }
</style>
