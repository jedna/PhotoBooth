<template>
	<div class="">
		<left-menu :photo_id="photo_id"></left-menu>
		<preview :photo_path="photo_id"></preview>
	</div>
</template>

<script>
	import LeftMenu from './BrowserView/LeftMenu'
	import Preview from './BrowserView/Preview'

	export default {
		props: ['photo_id'],
		created () {

		},
		components: {
			LeftMenu,
			Preview
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
