<template>
<div v-if="favoriteList.length > 0" class="favorite-wrapper">  
    <h1>Your Favorites</h1>
        <div class="favorite-container"> 
        <div v-for="video in favoriteList" :key="video.Path">
            <div class="favorite-video">
                <div class="favorite-btn"> 
                    <button @click="sendToggleFavorite(video)">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>
                <div class="favorite-play-btn"> 
                  <router-link :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                  Play
                  </router-link>
                </div>
                <div class="favorite-moreinfo-btn"> 
                    <button>More Info</button>
                </div>
          <img :src="video.Thumbnail" />
        </div>
      </div>
    </div>
</div>
    
</template>

<script>
export default {
    name: 'Favorite',
    props: ['favoriteList'],
    data(){
        return {
            compFavorites: '',
        }
    },
    methods: {
        sendToggleFavorite(video){
            this.$emit('recieveToggleFavorites', video)
        }
    },
    computed: {

    }
}
</script>

<style scoped>

.favorite-wrapper{
  border: 2px solid yellow;
 
}

h1{
  color: white;
  font-size: 25px;
  margin-left: 20px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);

}
.favorite-container{
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  
}
.favorite-video{
  position: relative;
}

.favorite-video:hover .favorite-btn, .favorite-moreinfo-btn, .favorite-play-btn{
  opacity: 1;
}

.favorite-btn{
  position:absolute;
  right: 0;
  top:0;
  z-index: 2;
  opacity: 0;
  transition: 150ms ease-in-out;
}

.favorite-moreinfo-btn {
  position:absolute;
  bottom: 0;
  top:0;
  z-index: 2;
  opacity: 0;
  transition: 150ms ease-in-out;
}

.favorite-play-btn{
  position:absolute;
  left: 0;
  bottom:0;
  z-index: 2;
  opacity: 0;
  transition: 150ms ease-in-out;
}

img{
    width: 250px;
}

</style>
