<template>
<div> 
    <h2 v-if="favoriteList.length > 0">Your Favorites</h2>
        <div class="favorite-container"> 
        <div v-for="video in favoriteList" :key="video.Path">
            <div class="favorite-video">
                <div class="favorite-btn"> 
                    <button @click="sendToggleFavorite(video)">⭐</button>
                </div>
                <h3>{{ video.Title }}</h3>
                <div class="favorite-play-btn"> 
                    <router-link :to="{name: 'display', params: {video: video}}" tag="button">
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
    width: 300px;
}

</style>
