<template>
    <div>
        <h1>Hello from Editor!</h1>
        <p>Current param is: {{ $route.params.photo_id }}</p>
        <router-link to="/">Back</router-link>
    </div>
</template>

<script>
    export default {}
</script>
