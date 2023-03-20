<template>
  <div v-if="favoriteList.length > 0" class="favorite-wrapper">  

      <h1>Your Favorites</h1>

      <carousel
      :carouselVideos="favoriteList"
      :favoritesId="favoritesId"
      :sectionTitle="title"
      @recieveToggleFavorites="sendToggleFavorite($event)" 
      @recieveToggleModal="sendToggleModal($event)"
      ></carousel>
          
  </div>
    
</template>

<script>
import carousel from './carousel.vue';

export default {
    name: 'Favorite',
    props: ['favoriteList', 'favoritesId'],
    components: {
      carousel
    },
    data(){
        return {
          title: "favorites"
        }
    },
    mounted(){
      
    },
    methods: {
        sendToggleFavorite(video){
            this.$emit('recieveToggleFavorites', video)
        },
        sendToggleModal(video){
          this.$emit('recieveToggleModal', video)
        }
    },
    computed: {

    }
}
</script>

<style scoped>

h1{
  color: white;
  font-size: 25px;
  margin-left: 20px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);

}


</style>
