<template>
    <div class="modal-container">

        <div class="modal" id="modalContainer"> 
            <video id="modal" :src="modal.Path" autoplay muted></video>

            <div class="placeholder" id="placeholder"></div>

            <h3 class="title">{{ modal.Title }}</h3>

            <div class="button-container">
                <router-link class="play" :to="{name: 'display', params: {videoId: modal.id}}" tag="button">
                    <svg viewBox="0 0 24 24" >
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                        Play
                </router-link>
                <button class="close" @click="sendToggleModal(modal)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="close" tabindex="0">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor"></path>
                    </svg>
                </button>
                <button class="fav" @click="sendToggleFavorites(modal)" v-if="favoritesId.includes(modal.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button class="fav" @click="sendToggleFavorites(modal)" v-if="!(favoritesId.includes(modal.id))">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                </button>
                <button class="mute-unmute" @click="toggleSound">
                    <svg viewBox="0 0 24 24" v-show="isMuted">
                        <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" v-show="!isMuted">
                        <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                </button>

            </div>
            <div class="divider"></div>

            <div class="below-container">
                <div class="info">
                    <p class="match"> {{ match }}% Match</p>
                    <p class="year"> {{ modal.Year }}</p>
                    <p class="duration">{{ duration }}</p>
                    <p class="description">{{ modal.Description }}</p>
                    <p class="categories"> <span>Genres:</span> {{ modal.Categories }} </p>
                </div>
                
                <div class="related-container"> 
                        <h1 class="related-title">Watch more like this</h1>
                        <div class="related-videos">
                            <div  v-for="rVideo in relatedVideos" :key="rVideo.Path">
                                <img class="related-item" @click="updateModal(rVideo)" v-if="rVideo.Path != modal.Path " :src="rVideo.Thumbnail"/>
                            </div>
                        </div>
                        
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
            isMuted: true,
            interval: null,
            match: 0
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
            this.match = Math.floor(Math.random() * (100 - 0 + 1) + 0)

            this.interval = setInterval(()=>{
            var video = document.getElementById("modal")
            if(!video.paused){
                document.getElementById("placeholder").style.opacity = '0'
                this.duration = this.formatTime(video.duration)
                clearInterval(this.interval)
            }
            
        }, 250)

        },
        toggleSound(){
            const video = document.getElementById("modal")
            console.log(video)
            if(video.muted){
                video.muted = !video.muted
                this.isMuted = false
            } else {
                video.muted = !video.muted
                this.isMuted = true
            }
        },
        formatTime(time){
            var sec = Math.floor(time % 60).toString()
            var min = Math.floor(time / 60) % 60
            var hr = Math.floor(time / 3600)
            if(sec < 10){
                 sec = "0" + sec
            }
            if(min < 10 && hr > 0){
                 min = "0" + min
            }
            if(hr == 0){
            return `${min}m`
            } else {
                return `${hr}h ${min}m`
            }
        }
    },
    mounted() {
        this.match = Math.floor(Math.random() * (100 - 0 + 1) + 0)
        // Finding related videos (shares a category, skipping repeats)

        this.modalCategories = this.modal.Categories.split(',')
        this.modalCategories.forEach((cat) => {
            this.videos.forEach((video) => {
                if((video.Categories.indexOf(cat) != -1) && (this.relatedVideos.indexOf(video) == -1)){ 
                    this.relatedVideos.push(video)
                    
                }
            })

        }) 

        // Placeholder
        this.interval = setInterval(()=>{
            var video = document.getElementById("modal")
            if(!video.paused){
                document.getElementById("placeholder").style.opacity = '0'
                this.duration = this.formatTime(video.duration)
                clearInterval(this.interval)
            }
            
        }, 250)
        
    }
}
</script>


<style scoped>

video{
    width: 100%;
    z-index: 100;
    top: 0;
}

.placeholder{
    position: absolute;
    top: 0;
    background: linear-gradient(to right, rgb(40,40,40)50%, rgba(70,70,70) 100%);
    width: 700px;
    height: 525px;
}

img {
    width: 200px;
    
}
.modal-container {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    pointer-events: auto;
    z-index: 120;
    top:0;
    color: black;
    font-family: 'Rubbik', Arial;


}

.modal {
    position: relative;
    background-color: rgba(35,35,35);
    width: 700px;
    max-width: 100%;
    overflow-y: scroll;
    height: 85vh;
    border-radius: 4px;
    filter: drop-shadow(0px 3px 3px black);
    margin-bottom: 20px;
}

.modal::-webkit-scrollbar {
      display: none;
    }

.title{
    color: white;
    left: 5%;
    top: 42%;
    font-weight: 700;
    font-size: 29px;
    position: absolute;
    text-shadow: black 1px 0 10px;

}

/* Buttons */

.button-container .play{
    position: absolute;
    top: 55%;
    left: 5%;
    display: flex;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
    border: none;
    opacity: .8;
    line-height: 1.8;
}

svg{
    width: 24px;
}

.play svg{
    width: 34px !important;
}

.modal .close{
    position: fixed;
    top: 2%;
    right: 2%;

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

.fav{
    position: absolute;
    top: 55%;
    left: 22%;
    background: rgb(74, 74, 74);
    color: white;
    border: solid 2px grey;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    padding: 5px;
    opacity: .8;
}

.mute-unmute{
    position: absolute;
    right: 10%;
    top: 55%;
    background: rgb(74, 74, 74);
    color: white;
    border: solid 2px grey;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    padding: 5px;
    opacity: .8;
}

button:hover{
    scale: 1.05;
    opacity: 1;
    cursor: pointer;
}
button{
    z-index: 999;
}

.related-container{
    display: flex;
    flex-wrap: wrap;
}

.divider{
    position: absolute;
    background: linear-gradient(to top,  rgb(35, 35, 35) 30%, rgba(0,0,0,0) 100%);
    /* rgb(35, 35, 35) */
    top: 45%;
    height: 270px;
    width: 100%;

}
.below-container{

    position: absolute;
    top: 70%;
    z-index: 5;
    color: white;
    height: 100%;
}

.below-container .year{
    font-weight: 600;
    position: absolute;
    top: 5%;
    left: 24%;
}

.below-container .match{
    color: rgb(0, 195, 0);
    position: absolute;
    top: 5%;
    left: 8%;
    font-weight: 700;

}

.below-container .duration{
    font-weight: 600;
    position: absolute;
    top: 5%;
    left: 35%;
}

.below-container .categories{
    position: absolute;
    width: 200px;
    top: 5%;
    right: 8%; 
}

.below-container .categories span{
    color: rgb(209, 209, 209);
}

.below-container .description{
    position: absolute;
    top: 10%;
    left: 8%;
}

.below-container .related-container{
    position: relative;
    top: 22%;
    left: 4%;
    width: 650px;
}

.related-container .related-item{
    display: flex;
    margin: 8px;
    justify-content: center;
    opacity: .8;
    filter: drop-shadow(0px 3px 3px black);

    transition: all .2s ease-in-out;

}

.related-title{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20px;
    font-weight: 700;
}

.related-videos{
    position: static;
    margin-top: 50px;
    margin-bottom: 20px;
    top: 100%;
    display: flex;
    flex-wrap: wrap;
    
}

.related-item:hover{
    transition: all .3s ease-in-out;
    scale: 1.1;
    opacity: 1;
    cursor: pointer;
}



</style>
