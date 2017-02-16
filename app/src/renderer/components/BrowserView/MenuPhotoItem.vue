<template>
	<li class="image-thumb" @click="selectPhoto(i)">
		<img :class="[photo.active ? 'active' : '', isPrinted(photo) ? 'printed' : '']"
		     class="img-responsive" :src="photo.thumb" alt="">
	</li>
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

	img {
		cursor: pointer;
		display: inline-block;
		padding: 1em 1.5em;
		border-top-right-radius: @border-radius-base;
		border-bottom-right-radius: @border-radius-base;
		font-size: .8em;
		color: @navbar-inverse-link-color;

	}

	img:hover {
		background-color: @navbar-inverse-link-active-bg;
		color: @navbar-inverse-link-active-color
	}

	img.active {
		background-color: @navbar-inverse-link-active-bg;
		color: @navbar-inverse-link-active-color
	}

	img.printed {
		border-left: 1px solid green;
	}
</style>
