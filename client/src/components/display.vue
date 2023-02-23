<template>
    <div class="body"> 
        <div class="video-container full-screen"> 
            <div class="video-controls-container" >
                <!-- Navigation -->
                <div class="nav"> 
                    <router-link :to="{name: 'gallery'}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </router-link>
                </div>
                
                <!-- Timeline -->
                <div class="timeline-container">
                    <div class="progress-bar" @click="updateTime($event)">
                        <div class="watched-bar"></div>
                        <div class="head-btn"></div>
                    </div>
                    <div class="video-duration-container">
                        {{ remainingTime }}
                    </div>
                </div>
                
                <div class="controls">
                    <!-- PLAY/PAUSE -->
                    <button>
                        <svg 
                            v-if="!isPlaying" 
                            @click="togglePlay"  viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg 
                            v-if="isPlaying" 
                            @click="togglePlay" viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>

                     <!-- SKIP -->
                     <button>
                        <svg 
                            @click="rewind" 
                            xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z"/><g>
                            <path d="M10.89,16h-0.85v-3.26l-1.01,0.31v-0.69l1.77-0.63h0.09V16z"/><path d="M15.17,14.24c0,0.32-0.03,0.6-0.1,0.82s-0.17,0.42-0.29,0.57s-0.28,0.26-0.45,0.33s-0.37,0.1-0.59,0.1 s-0.41-0.03-0.59-0.1s-0.33-0.18-0.46-0.33s-0.23-0.34-0.3-0.57s-0.11-0.5-0.11-0.82V13.5c0-0.32,0.03-0.6,0.1-0.82 s0.17-0.42,0.29-0.57s0.28-0.26,0.45-0.33s0.37-0.1,0.59-0.1s0.41,0.03,0.59,0.1c0.18,0.07,0.33,0.18,0.46,0.33 s0.23,0.34,0.3,0.57s0.11,0.5,0.11,0.82V14.24z M14.32,13.38c0-0.19-0.01-0.35-0.04-0.48s-0.07-0.23-0.12-0.31 s-0.11-0.14-0.19-0.17s-0.16-0.05-0.25-0.05s-0.18,0.02-0.25,0.05s-0.14,0.09-0.19,0.17s-0.09,0.18-0.12,0.31 s-0.04,0.29-0.04,0.48v0.97c0,0.19,0.01,0.35,0.04,0.48s0.07,0.24,0.12,0.32s0.11,0.14,0.19,0.17s0.16,0.05,0.25,0.05 s0.18-0.02,0.25-0.05s0.14-0.09,0.19-0.17s0.09-0.19,0.11-0.32s0.04-0.29,0.04-0.48V13.38z"/></g></g></g></svg>
                    </button>
                    <button>
                        <svg 
                            @click="forward" 
                            xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><g>
                            <path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z"/><polygon points="10.86,15.94 10.86,11.67 10.77,11.67 9,12.3 9,12.99 10.01,12.68 10.01,15.94"/><path d="M12.25,13.44v0.74c0,1.9,1.31,1.82,1.44,1.82c0.14,0,1.44,0.09,1.44-1.82v-0.74c0-1.9-1.31-1.82-1.44-1.82 C13.55,11.62,12.25,11.53,12.25,13.44z M14.29,13.32v0.97c0,0.77-0.21,1.03-0.59,1.03c-0.38,0-0.6-0.26-0.6-1.03v-0.97 c0-0.75,0.22-1.01,0.59-1.01C14.07,12.3,14.29,12.57,14.29,13.32z"/></g></g></svg>
                    </button>

                    <!-- VOLUME -->
                    <div>
                        <button class="volume-btn">
                            <input 
                                type="range" 
                                @change="changeVolume($event)" 
                                class="volume-slider" 
                                min="0" max="1" step="any" 
                                :value="volumeLevel" /> 

                            <svg 
                                @click="toggleMute" 
                                v-if="volumeLevel > 0.5 && isMuted == false" 
                                class="volume-high-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                            </svg>
                            <svg 
                                @click="toggleMute" 
                                v-if="volumeLevel > 0 && volumeLevel < .5 && isMuted == false" 
                                class="volume-low-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                            </svg>
                            <svg 
                                @click="toggleMute" 
                                v-if="volumeLevel == 0 || isMuted == true" 
                                class="volume-muted-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                            </svg>
                        </button>
                    </div>
                     <!-- TITLE -->
                    <div class="title" v-if="displayVideo">
                        {{displayVideo.Title}}
                    </div>

                    <!-- SPEED -->
                    <div> 
                        <button @click="changeSpeed" class="speed-btn">
                            x{{speed}}
                        </button>
                    </div>
                    

                    <!-- CAPTIONS -->
                    <button >
                        <svg v-if="!hasCaptions" @click="toggleCaptions" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                        </svg>
                        <svg v-if="hasCaptions" @click="toggleCaptions" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/>
                            <path d="M6.83,4H19c1.1,0,2,0.9,2,2v12c0,0.05-0.01,0.1-0.02,0.16l-3.38-3.38C17.84,14.59,18,14.32,18,14v-1h-1.5v0.5h-0.17 l-1.83-1.83V10.5h2V11H18v-1c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1v0.17L6.83,4z M19.78,22.61L17.17,20H5c-1.11,0-2-0.9-2-2V6 c0-0.05,0.02-0.1,0.02-0.15L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M11,13.83L10.17,13H9.5v0.5h-2v-3h0.17L6.4,9.22 C6.16,9.41,6,9.68,6,10v4c0,0.55,0.45,1,1,1h3c0.55,0,1-0.45,1-1V13.83z"/>
                        </svg>
                    </button>

                    <!-- FULL SCREEN -->
                    <button class="full-screen-btn">
                        <svg @click="toggleFullScreen" v-if="isFullscreen" viewBox="0 0 24 24">
                            <path   fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                        </svg>
                        <svg @click="toggleFullScreen" v-if="!isFullscreen" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <video @click="togglePlay" v-if="displayVideo" :src="displayVideo.Path">
                <track
                label="English"
                kind="captions"
                srclang="en"
                src=""
                default
                />
            </video>
        </div>
        
    </div>
</template>

<script>
import videoService from '../services/VideoService'
import WatchAgainService from '../services/WatchAgainService'
import store from '../store/store'

export default {
    name: 'display',
    data(){
        return {
            displayVideo: null,
            isPlaying: false,
            isFullscreen: true,
            hasCaptions: true,
            volumeLevel: .25,
            remainingTime: 0,
            isMuted: false,
            speed: 1,
            interval: null
            
        }
    },
    async mounted() {
        //Start loading screen
        store.commit('setLoading', true);

        //GET request for the video
        const videoId = this.$route.params.videoId
        this.displayVideo = (await videoService.show(videoId)).data
        

        //Posting to user history
        WatchAgainService.post({
            videoId: videoId,
            userId: this.$store.state.user.id
        })
        
        //Captions
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) 
                {
                    const blob = new Blob([this.responseText], { type: "text,vtt" });
                    this.captions = URL.createObjectURL(blob);
                    document.querySelector('track').src = this.captions
                }
        }
        xmlhttp.open("GET", this.displayVideo.Subtitles, true)
        xmlhttp.send();

        //Getting video duration
        this.interval = setInterval(this.getCurrent, 250)

        //End loading screen, play video
        setTimeout(() => {
            store.commit('setLoading', false),
            this.togglePlay();
        }, 2500);

        
    },
    destroyed() {
        clearInterval(this.interval)
    },
    created() {
        //Key Binds
        window.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()){
                case " ":
                    this.togglePlay()
                    break
                case "k":
                    this.togglePlay()
                    break
                case "f":
                    this.toggleFullScreen()
                    break
                case "m":
                    this.toggleMute
                    break
                case "c":
                    this.toggleCaptions()
                    break
                case "arrowright":
                case "l":
                    this.forward()
                    break
                case "arrowleft":
                case "j":
                    this.rewind()
            }
        })
        
    },

    methods: {
        togglePlay(){
            const video = document.querySelector("video")
            if(video.paused){
                video.play()
                this.isPlaying = true;
            } else {
                video.pause()
                this.isPlaying = false;
            }
        },

        toggleFullScreen(){
            const videoContainer = document.querySelector(".video-container")
            if (document.fullscreenElement != null){
                document.exitFullscreen()
                this.isFullscreen = true
            } else {
                videoContainer.requestFullscreen()
                this.isFullscreen = false
            }
        },

        toggleMute(){
            const video = document.querySelector("video")
            video.muted = !video.muted
            if(video.muted){
                this.isMuted = true
            } else {
                this.isMuted = false
            }
        },

        toggleCaptions(){
            const video = document.querySelector("video")
            const captions = video.textTracks[0]
            if(captions.mode === "hidden"){
                captions.mode = "showing"
                this.hasCaptions = true
            } else {
                captions.mode = "hidden"
                this.hasCaptions = false

            }

        },

        changeVolume(event){
            const video = document.querySelector("video")
            this.volumeLevel = event.target.value
            video.volume = this.volumeLevel
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
            return `${min}:${sec}`
            } else {
                return `${hr}:${min}:${sec}`
            }
        },
        
        getCurrent(){
        const video = document.querySelector("video")
        const percent = (video.currentTime / video.duration) * 100
        const watchedBar = document.querySelector('.video-container .timeline-container .progress-bar .watched-bar')
        watchedBar.style.width = percent + '%'
    
        this.remainingTime = this.formatTime(video.duration - video.currentTime)
        },
        updateTime(event){
            const progrss = document.querySelector('.video-container .timeline-container .progress-bar')
            const video = document.querySelector("video")

            const pos = (event.pageX - (progrss.offsetLeft + progrss.offsetParent.offsetLeft)) / progrss.offsetWidth
            video.currentTime = pos * video.duration
        },

        forward(){
            const video = document.querySelector("video")
            video.currentTime += 10

        },
        rewind(){
            const video = document.querySelector("video")
            video.currentTime -= 10
        },
        changeSpeed(){
            const video = document.querySelector("video")
            this.speed = video.playbackRate + .25
            if(this.speed > 2){
                this.speed = .25
            }
            video.playbackRate = this.speed
            
        },
        
    },
}


</script>

<style scoped>
.body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
    font-family: 'Rubbik', sans-serif;
}

svg, .speed-btn{
    width: 50px;
    height: 50px;
    scale: 1.20;
    color: white;
    margin: 0px 1vw;
    cursor: pointer;
    opacity: .4;
    transition: all .2s ease-in-out;
}
.speed-btn:hover, svg:hover{
    scale: 1.45;
    opacity: 1;
}
button{
    background: none;
    border: none;
}
.video-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-container video{
    width: 100%;
    height: 100%;
}

.nav{
    position: fixed;
    top:0;
}
.video-container .video-controls-container{
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: none;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 40vh;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9));
    transition: opacity 0.5s linear;

    z-index: 2;
}

.video-container:hover .video-controls-container{
    display: flex;
}

.video-container .controls{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.speed-btn{
    font-size: larger;
}
.title{
    font-size: 2vw;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
}

/* VOLUME */
.volume-slider{
    -webkit-appearance: slider-vertical;
    width: 8px;
    height: 100px;
    padding: 0 5px;
    display: none;
}
.volume-btn:hover .volume-slider{
    display: inline-block;
}

/*TIMELINE*/
.video-container .timeline-container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    color: white
}

.video-container .timeline-container .video-duration-container{
    margin: 1vw;
    width: 4vw;
}

.video-container .timeline-container .progress-bar{
    width: 90vw;
    height: 1vw;
    max-height: 7px;
    background: #5b5b5b;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.video-container .timeline-container .progress-bar .watched-bar{
    height: 110%;
    width: 20%;
}
.video-container .timeline-container .progress-bar .watched-bar,
.video-container .timeline-container .progress-bar .head-btn{
    background: #E31221;
    display: inline-block;
    transition: all .2s ease-in-out;
}

.video-container .timeline-container .progress-bar .head-btn{
    height: 3vw;
    width: 3vw;
    max-height: 25px;
    max-width: 25px;
    border-radius: 50%;
    transform: translateX(-50%);
}

</style>