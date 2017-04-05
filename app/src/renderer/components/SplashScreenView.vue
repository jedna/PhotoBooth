<style>

</style>

<template>
    <div>
        <img src="./BrowserView/assets/logo.big.png" alt="Logo" width="200">
        <h1>Welcome to PhotoBooth</h1>
    </div>
</template>

<script>
    export default {
        created () {
            let self = this
            setTimeout(function () {
                self.$router.push('/landing-page')
            }, 2000)
        }
    }
</script>
