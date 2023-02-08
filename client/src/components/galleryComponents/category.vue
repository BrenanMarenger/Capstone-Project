<template>
    <div> 
        <h1> {{ currentCategory }}</h1>
        <div class="category-container"> 
            <div v-for="video in catVideos" :key="video.Path">
                
                    <h3>{{ video.Title }}</h3>
                    <router-link :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                     Play
                    </router-link>
                    <button @click="sendToggleModal(video)">
                        More Info
                    </button>
                    <button @click="sendToggleFavorite(video)">⭐</button>
                    <img :src="video.Thumbnail"/>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['currentCategory','videos'],
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
img{
    width: 300px;
    padding-bottom: 10px;
}
img:hover{
    scale: 1.1;
}

.category-container{
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
}

</style>