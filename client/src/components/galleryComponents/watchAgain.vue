<template>
<div class="body" v-if="watchAgainVideos.length > 0">
    <h1 class="title"> Watch Again </h1>

    <div class="watch-again-container"> 
        <div v-for="video in watchAgainVideos" :key="video.Path">
            <div class="watch-again-item"> 
                <img :src="video.Thumbnail"/>
                <div class="history-bar">
                    <div class="watched-bar" :style="{'width': video.Spot}"></div>
                </div>
                <div class="watch-again-controls">
                    <div class="watch-again-title">
                        <h1>{{ video.Title }}</h1>
                    </div>
                    <router-link class="play" :to="{name: 'display', params: {videoId: video.id}, query: { time: video.Spot }}" tag="button">
                    <svg viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                    </router-link>
                    <button class="more-info" @click="sendToggleModal(video)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </button>
                    <button @click="sendToggleFavorite(video)" v-if="favoritesId.includes(video.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                    <button @click="sendToggleFavorite(video)" v-if="!(favoritesId.includes(video.id))">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                    </button> 
                </div>
               

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
.title{
  color: white;
  font-size: 25px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);
  padding: 15px;
  padding-left: 20px;
  z-index: 500;

}
.watch-again-title{
    color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 5px;
  background: rgb(18, 18, 18);
}
.body{
    
   
    background: rgb(34, 34, 34);

}

button{
    background: rgb(74, 74, 74);
    color: white;
    border: solid 2px grey;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    padding: 5px;
    cursor: pointer;
    opacity: .8;
}

.watch-again-container{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100vw;
    height: 220px;
    gap: 10px;
    background: rgb(34, 34, 34);
    border: 2px solid green;
    
}

.watch-again-controls{
    position:relative;
  /* display: none; */
  background: rgb(61, 61, 61);
  border: 3px solid black;
  width: 255px;
  padding-bottom: 60px;
  height: 70px;
  font-family: 'Rubbik', Arial;
}
.watch-again-controls button:hover{
  scale: 1.03;
  opacity: 1;
}

.play{
  color: black !important;
  background: white !important;
  border: solid 1px white !important;
}
.play button{
  background: white !important;
}

.watch-again-controls .play{
  position: absolute;
  top: 30%;
  left: 2%;
}

.watch-again-controls .more-info{
  position: absolute;
  right: 2%;
  top: 30%;

}
.watch-again-item{
    
}

.watch-again-item:hover{
    scale: 1.2;
    transition: all .5s ease-in-out;
    transform: translateY(-60px);
    margin: 0 30px 0 30px;
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
