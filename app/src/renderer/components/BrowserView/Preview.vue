<template>
	<div class="col-content">
		<h1>{{ photo_path }}</h1>

		<div v-if="photo_path" class="photo">
			<router-link to="/editor/1" tag="div">
				<img v-if="photo_path" class="img-responsive" :src="photo_path">
			</router-link>
			<!--<img v-else class="img-responsive" src="img/loading.gif">-->
		</div>
		<div v-else>
			<p>Ahoj</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['photo_path']
	}
</script>

<style scoped lang="less">
	@import '../../assets/less/admin.less';

	.col-content {
		position: absolute;
		top:0;
		bottom:0;
		left: @left-menu-width;
		right:0;
		overflow: hidden;
		align-items: center;
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.photo {
		/*min-height: 200px;*/
		will-change: opacity;
		-webkit-transition: opacity 1s;
		transition: opacity 1s;
		text-align: center;
		background-color: @navbar-inverse-link-active-bg;


		&.loaded {
			 opacity: 1;
		 }

		/*background: url(../img/loading.gif) center center no-repeat;*/

		img {
			cursor: pointer;
			max-height: 100vh;
			display: inline-block;
		}
	}
</style>
