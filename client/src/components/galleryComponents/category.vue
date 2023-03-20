<template>
    <div class="body"> 
        <h1> {{ currentCategory }}</h1>
        <carousel
        :carouselVideos="catVideos"
        :favoritesId="favoritesId"
        :sectionTitle="currentCategory"
        @recieveToggleFavorites="sendToggleFavorite($event)" 
        @recieveToggleModal="sendToggleModal($event)"
        ></carousel>
            
        
    </div>
    
</template>

<script>
import carousel from './carousel.vue';

export default {
    name: 'Category',
    props: ['currentCategory','videos', 'favoritesId'],
    data(){
        return {
            catVideos: [],
            
        }
    },
    components: {
      carousel
    },
    mounted(){
        for(let vid of this.videos){
            if(vid.Categories.includes(this.currentCategory)){
                this.catVideos.push(vid)
            }
        }
        //SHUFFLE ITEMS
        for(let i = this.catVideos.length - 1;i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.catVideos[i]
            this.catVideos[i] = this.catVideos[j];
            this.catVideos[j] = temp;
        }

  },
  methods: {
    sendToggleFavorite(video){
            this.$emit('recieveToggleFavorites', video)
        },
    sendToggleModal(video){
        this.$emit('recieveToggleModal', video)
        },
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
  padding: 10px;
}


</style>