<template>
    <div style="text-align: center;">
        <h1>Hello from Editor!</h1>
        <p>Current param is: {{ $route.params.path }}</p>
        <router-link :to="{ name: 'browser-selected', param: {path: $route.params.path}}">Back</router-link>
    </div>
</template>

<script>
    export default {}
</script>
