<template>
  <div id="app">
    
    <transition name="fade">
      <loader v-if="isLoading" />
    </transition>
    
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

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
/* .fade-enter, */
 .fade-leave-to {
  opacity: 0;
  scale: 1.2;
}

</style>
