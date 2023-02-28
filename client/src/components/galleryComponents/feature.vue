<template>
    
    <div class="feature-container playing muted">
        <div class="title">
            <strong>
            {{ feature.Title }}
            </strong>
        </div>
        <div class="description"> 
            {{ feature.Description }}
        </div>
        <div class="categories"> 
            {{ feature.Categories }} 
            -
            {{ feature.Year }}
        </div>
        <div class="button-container"> 
            <div class="play-now">
                <router-link :to="{name: 'display', params: {videoId: feature.id}}" tag="button">
                    <svg viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                    Play
                </router-link>
            </div>
            <div class="more-info"> 
                <button @click="sendToggleModal(feature)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    More Info
                </button>
            </div>
            <div class="play-pause"> 
                <button  @click="togglePlay" class="play">
                    <svg viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                 </button>
                <button @click="togglePlay" class="pause">
                    <svg viewBox="0 0 24 24" >
                        <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                    </svg>
                 </button>
            </div>
            <div class="mute-unmute"> 
                <button @click="toggleSound" class="mute">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                    </svg>
                </button>
                <button @click="toggleSound" class="unmute">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                </button>
            </div>
            
        </div>
        
      <video autoplay muted  loop class="feature-video" id="feature"
                :src="feature.Path" >
        </video>
    </div>
    
</template>

<script>
export default {
    name: 'Feature',
    props: ['videos', 'modalActive'],
    data(){
        return {
            feature: '',
        }
    },
    async mounted(){
        setTimeout(this.hideInfo, 5000)
  },
  async created(){
    this.feature = await this.videos[Math.floor(Math.random() * this.videos.length)];

  },
  methods: {
    hideInfo(){
        console.log("NOWNOWNOWNOWNNWNOOWOOWOOW")
    },
    sendToggleModal(video){
        this.$emit('recieveToggleModal', video)
    },
    toggleSound(){
        //const muteUnmuteBtn = document.querySelector("mute-unmute")
        const video = document.querySelector("video")
        const featureContainer = document.querySelector(".feature-container")

        if(video.muted){
            video.muted = !video.muted;
            featureContainer.classList.remove("muted")
            featureContainer.classList.add("unmuted")

        } else {
            video.muted = true;
            featureContainer.classList.remove("unmuted")
            featureContainer.classList.add("muted")
        }   
    },
    togglePlay(){
        //const playPauseBtn = document.querySelector(".play-pause")
        const video = document.querySelector("video")
        const featureContainer = document.querySelector(".feature-container")
        if(video.paused){
            video.play()
            featureContainer.classList.remove("paused")
            featureContainer.classList.add("playing")
        } else {
            video.pause()
            featureContainer.classList.remove("playing")
            featureContainer.classList.add("paused")
        } 
    }
  },
  watch: {
    modalActive(){
        const video = document.querySelector("video")
        const featureContainer = document.querySelector(".feature-container")
        if(this.modalActive && !video.paused){
            video.pause()
            featureContainer.classList.remove("playing")
            featureContainer.classList.add("paused")
        } 
    }
  }
}


</script>

<style scoped>
.feature-video{
    position: relative;
    width: 100%;
    box-shadow: 0px 0px 7px 3px rgba(81, 81, 81, 0.2);
}
.feature-container{
    font-family: 'Rubbik', Arial;
    position: relative;
    
    margin-inline: auto;
    color:beige;
    
    background: rgb(30, 30, 30);
    width: 100%;
    padding-bottom: 20px;
}
.title{
    position: absolute;
    font-size: 50px;
    z-index: 5;
    top: 30%;
    left: 8%;
    text-shadow: rgb(235, 235, 235) 1px 0 10px;
}
.description{
    position: absolute;
    font-size: 30px;
    z-index: 5;
    top: 42%;
    left: 10%;
    text-shadow: rgb(235, 235, 235) 1px 0 10px;

}
.categories{
    position: absolute;
    font-size: 20px;
    font-weight: 600;
    z-index: 5;
    top: 48%;
    left: 11%;
    opacity: .8;
}

.button-container{
    position: absolute;
    top: 55%;
    left: 7%;
    z-index: 3;
    display: flex;
    flex-direction: column;
}

.play-now svg{
    position: relative;
    height: 50px;
    top: -40%;
}

.play-now button{
    position: relative;
    display: flex;
    width: 150px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
    border: none;
}

button{
padding: 10px;
margin-left: 3px;
width: 100px;
height: 50px;
cursor: pointer;
opacity: .85;
transition: 150ms ease-in-out;
}

button:hover{
    opacity: 1;
    scale: 1.02;
}

.feature-container.paused .pause{
    display: none;
}
.feature-container.playing .play{
    display: none;
}

.feature-container.muted .mute{
    display: none;
}
.feature-container.unmuted .unmute{
    display: none;
}

.mute-unmute{
    position: absolute;
    top: 350%;
    right: -750%;
}

.mute-unmute button{
    background: none;
    border-radius: 50px;
    width: 50px;
    border: 4px solid white; 
}

.mute-unmute svg{
    color: white;
    width: 30px;
    position: relative;
    right: 18%;
    top: -23%;
}

.play-pause{
    position: absolute;
    top: 350%;
    right: -710%;
}

.play-pause button{
    background: none;
    border-radius: 50px;
    width: 50px;
    border: 4px solid white;
    justify-content: center;
    align-content: center;
}

.play-pause svg{
    color: white;
    width: 30px;
    position: relative;
    right: 18%;
    top: -23%;
}

.more-info{
    position: absolute;
    left: 110%;
}

.more-info button{
    background: rgb(81, 81, 81);
    color: white;
    position: relative;
    display: flex;
    width: 150px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
    border: none;
}
.more-info svg{
    height: 30px;
    padding-right: 5px;
}
</style>