<template>
    <div class="modal-container">
        <div class="modal"> 
            <router-link :to="{name: 'display', params: {videoId: modal.id}}" tag="button">
                Play
            </router-link>
            <button @click="sendToggleModal(modal)">
                X
            </button>
            <button @click="sendToggleFavorites(modal)" v-if="favoritesId.includes(modal.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button @click="sendToggleFavorites(modal)" v-if="!(favoritesId.includes(modal.id))">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            </button>
            <h3>{{ modal.Title }}</h3>
            <video id="modal" :src="modal.Path" autoplay muted></video>
            <p>{{ modal.Description }}</p>
            <p>{{ modal.Categories }} - {{ modal.Year }}</p>
            <p>{{ duration }}</p>

            <div class="related-container"> 
                <h4>Watch more like this: </h4>
                <div class="related-videos" v-for="rVideo in relatedVideos" :key="rVideo.Path"> 
                    <img @click="updateModal(rVideo)" v-if="rVideo.Path != modal.Path " :src="rVideo.Thumbnail"/>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script>

export default {
    name: 'Modal',
    props: ['modal', 'videos', 'favoritesId'],
    data(){
        return {
            relatedVideos: [],
            modalCategories: [],
            duration: 0,
        }
    },
    methods: {
        sendToggleModal(modal){
            this.$emit('recieveToggleModal', modal)
        },
        sendToggleFavorites(video){
            this.$emit('recieveToggleFavorite', video)
        },
        updateModal(video){
            this.$emit('receiveModal', video)
        }
    },
    mounted() {
        this.modalCategories = this.modal.Categories.split(',')
        this.modalCategories.forEach((cat) => {
        
            this.videos.forEach((video) => {
                if((video.Categories.indexOf(cat) != -1) && (this.relatedVideos.indexOf(video) == -1)){ //if cat is found in video.Category string and is not in related videos already
                    this.relatedVideos.push(video)
                }
            })

        })    
        const video = document.getElementById("modal")
        this.duration = video.duration
    }
}
</script>


<style scoped>

video{
    width: 600px;
}

img {
    width: 100px;
    
}
.modal-container {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    pointer-events: auto;
    z-index: 120;
    top:5%;
    left: 30%;
    color: black;
    overflow-y: scroll;
    
    /*
    opacity: 0;
    pointer-events: none;
    */
}

.related-container{
    display: flex;
    flex-wrap: wrap;
}


.modal {
    background-color: #fff;
    width: 700px;
    max-width: 100%;
    
}
</style>
