<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {}
</script>

<style>
	@import url(https://fonts.googleapis.com/css?family=Lato:300);

	* {
		margin: 0;
		padding: 0;
	}

	html,
	body {
		height: 100%;
	}

	#app {
		z-index: 10;
		/*padding-top: 50 px;*/
		position: absolute;
		/*display: flex;*/
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x: hidden;
		overflow-y: auto;
	}

	/*body {*/
		/*align-items: center;*/
		/*!*background: radial-gradient(*!*/
		/*!*ellipse at center,*!*/
		/*!*rgba(255, 255, 255, 1) 0%,*!*/
		/*!*rgba(229, 229, 229, .85) 100%*!*/
		/*!*);*!*/
		/*!*background-position: center;*!*/
		/*display: flex;*/
		/*font-family: Lato, Helvetica, sans-serif;*/
		/*justify-content: center;*/
		/*text-align: center;*/
	/*}*/
</style>
