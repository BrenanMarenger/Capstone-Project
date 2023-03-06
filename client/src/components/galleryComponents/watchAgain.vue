<template>
<div v-if="watchAgainVideos.length > 0">
    <h2> Watch Again </h2>

    <div class="watch-again-container"> 
        <div v-for="video in watchAgainVideos" :key="video.Path">
            <div  > <!-- v-if="watchAgainVideos.includes(video.id)"-->
                <h3>{{ video.Title }} {{ video.Spot }}</h3>
                <!-- PASS THE DURATION AS A PROP -->
                <router-link :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                Play
                </router-link>
                <button @click="sendToggleModal(video)">
                    More Info
                </button>
                <button @click="sendToggleFavorite(video)" v-if="favoritesId.includes(video.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button @click="sendToggleFavorite(video)" v-if="!(favoritesId.includes(video.id))">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                </button>
                <div class="history-bar">
                    <div class="watched-bar" :style="{'width': video.Spot}"></div>

                </div>

                <img :src="video.Thumbnail"/>
            </div>
        </div>
</div>
</div>
   
</template>

<script>
import WatchAgainService from '../../services/WatchAgainService'
import videoService from '@/services/VideoService'

export default {
    name: 'WatchAgain',
    props: ['videos','favoritesId'],
    data(){
        return {
            history: [],
            watchAgainVideos: [],
        }
    },
    async mounted() {
        setTimeout(async ()=> {
        this.history = (await WatchAgainService.index({
            userId: this.$store.state.user.id
        })).data
        for(let item of this.history){
            var key = item.VideoId
            var value = item.Spot + '%'
            var index = this.history.indexOf(item)
            this.watchAgainVideos.push((await videoService.show(key)).data)
            this.watchAgainVideos[index].Spot = value   
        }}, 1000)
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
img{
    width: 250px;
}

.watch-again-container{
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.history-bar{
    width: 250px;
    height: 1vw;
    max-height: 7px;
    background: #5b5b5b;
}

.watched-bar{
    height: 1vw;
    max-height: 7px;
    width: 10%;
    background: red

}
</style>
