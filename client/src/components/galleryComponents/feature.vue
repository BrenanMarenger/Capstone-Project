<template>
    
    <div class="feature-container playing muted">
        <div class="title">
            <strong>
            Check out {{ feature.Title }}!
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
            <div class="play-pause"> 
                <button  @click="togglePlay" class="play">▶️ Play</button>
                <button @click="togglePlay" class="pause">⏸️ Pause</button>
            </div>
            <div class="watch-now"> 
                <router-link :to="{name: 'display', params: {videoId: feature.id}}" tag="button">
                Watch Now
                </router-link>
            </div>
            <div class="mute-unmute"> 
                <button @click="toggleSound" class="mute">Mute</button>
                <button @click="toggleSound" class="unmute">Unmute</button>
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
  },
  async created(){
    this.feature = await this.videos[Math.floor(Math.random() * this.videos.length)];

  },
  methods: {
    toggleSound(){
        const muteUnmuteBtn = document.querySelector("mute-unmute")
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
        const playPauseBtn = document.querySelector(".play-pause")
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
    modalActive(){ //Bug where feature plays if paused before modal was opened
        if(this.modalActive){
            this.togglePlay()
        }
        
    }
  }
}


</script>

<style scoped>
.feature-video{
  width: 100%
}
.feature-container{
    position: relative;
    justify-content: left;
    margin-inline: auto;
    color:beige;
    width: 80%
}
.title{
    position: absolute;
    font-size: 50px;
    top: 58%;
    left: 5%;
    text-shadow: #FC0 1px 0 10px;
}
.description{
    position: absolute;
    font-size: 30px;
    top: 72%;
    left: 10%;
    text-shadow: #FC0 1px 0 10px;

}
.categories{
    position: absolute;
    font-size: 20px;
    top: 78%;
    left: 11%;
    opacity: .8;
}

.button-container{
    position: absolute;
    bottom: 8%;
    left: 5%;
    z-index: 3;
    display: flex;
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
    scale: 1.05;
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
    left: 95% !important
}

</style>