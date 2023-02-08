<template>
    <div class="modal-container">
        <div class="modal"> 
            <router-link :to="{name: 'display', params: {video: modal}}" tag="button">
                Play
            </router-link>
            <button @click="sendToggleModal(modal)">
                X
            </button>
            <button @click="sendToggleFavorites(modal)">⭐</button>
            <h3>{{ modal.Title }}</h3>
            <video :src="modal.Path" autoplay muted></video>
            <p>{{ modal.Description }}</p>
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
    props: ['modal', 'videos'],
    data(){
        return {
            relatedVideos: [],
            modalCategories: [],
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
    }
}
</script>


<style scoped>

video{
    width: 600px;
}

img {
    width: 200px;
    
}
.modal-container {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    pointer-events: auto;
    z-index: 120;
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
