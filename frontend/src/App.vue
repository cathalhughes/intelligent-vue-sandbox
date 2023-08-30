<template>
    <div id="app">
        <vue-generator />
    </div>
</template>

<script>
import VueGenerator from './components/vue-generator.vue';

export default {
    name: 'App',
    components: {
        VueGenerator,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
