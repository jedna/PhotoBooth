<template>
	<div class="">
		<left-menu></left-menu>
		<preview></preview>
	</div>
</template>

<script>
	import LeftMenu from './BrowserView/LeftMenu'
	import Preview from './BrowserView/Preview'

	export default {
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

	.navbar-brand {
		padding: 10px;

	&>img {
		height: 100%;
		padding: 0px; /* firefox bug fix */
		width: auto;
	}

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
