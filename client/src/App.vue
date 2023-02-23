<template>
  <div id="app">
    
    <loader v-if="isLoading" />
    
    <router-view/>
    
  </div>
</template>

<script>
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
import loader from './components/loading.vue'
export default {
  name: 'App',
  components: {
    loader
  },
  computed: {
    isLoading() {
      //console.log("loading!", this.$store.state.loading)
      return this.$store.state.loading
    }
  }
}
</script>

<style>

</style>
