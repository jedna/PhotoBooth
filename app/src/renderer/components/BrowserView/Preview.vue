<template>
	<div class="col-content">
		<div class="photo" @click="editPhoto(photo)">
			<img v-if="photo" class="img-responsive" :src="photo.path">
			<!--<img v-else class="img-responsive" src="img/loading.gif">-->
		</div>
	</div>
</template>

<script>
	export default {
		props: ['photo']
	}
</script>

<style scoped>

</style>
