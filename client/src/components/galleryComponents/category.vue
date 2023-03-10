<template>
    <div class="body"> 
        <h1> {{ currentCategory }}</h1>
        <div class="category-container"> 
            <div v-for="video in catVideos" :key="video.Path">                  
                    <img :src="video.Thumbnail"/>

                    <span class="category-controls">
                        <router-link :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                            <svg viewBox="0 0 24 24" >
                                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                            </svg>
                        </router-link>
                        <button @click="sendToggleModal(video)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        </button>
                        <button @click="sendToggleFavorite(video)" v-if="favoritesId.includes(video.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                        <button @click="sendToggleFavorite(video)" v-if="!(favoritesId.includes(video.id))">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                        </button>
                    </span>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['currentCategory','videos', 'favoritesId'],
    data(){
        return {
            catVideos: []
        }
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
  }
  },
  
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
img{
    width: 250px;
    padding-top: 20px;
}

.category-container{
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

svg{
    width: 24px;
}

.category-controls{
    position:relative;
    /* display: none; */
    background: rgb(61, 61, 61);
    width: 250px;
    padding-bottom: 20px;
    padding-bottom: 60px;
    z-index: 20;
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

</style>