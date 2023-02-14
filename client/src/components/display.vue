<template>
    <div> 
        <div class="video-container full-screen"> 
            <div class="video-controls-container" >
                <!-- Navigation -->
                <div class="nav"> 
                    <router-link :to="{name: 'gallery'}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </router-link>
                    
                </div>
                <div class="title">
                    {{displayVideo.Title}}
                </div>
                <!-- Timeline -->
                <div class="timeline-container" @mousemove="updateTimeline" @mousedown="toggleScrubbing" @mouseup="toggleScrubbing">
                    <div class="timeline" >
                        <div class="timeline-btn">

                        </div>
                    </div>
                </div>
                <!-- PLAY/PAUSE -->
                <div class="controls">
                    <button class="playpause-btn" >
                        <svg @click="togglePlay" class="play-icon"  viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg @click="togglePlay" class="pause-icon" viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
                    <!-- VOLUME -->
                    <div class="volume-container">
                        <button class="volume-btn">
                            <svg @click="toggleMute" v-if="volumeLevel > 0.5 && isMuted == false" class="volume-high-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                            </svg>
                            <svg @click="toggleMute" v-if="volumeLevel > 0 && volumeLevel < .5 && isMuted == false" class="volume-low-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                            </svg>
                            <svg @click="toggleMute" v-if="volumeLevel == 0 || isMuted == true" class="volume-muted-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                            </svg>
                            <input type="range" @change="changeVolume($event)" class="volume-slider" min="0" max="1" step="any" :value="volumeLevel"> 
                        </button>
                    </div>
                    <!-- TIME -->
                    <div class="video-duration-container">
                        <div class="current-time">
                            {{ current }}
                        </div>
                        /
                        <div class="total-time">
                            {{ total }}
                        </div>
                    </div>
                    <!-- SKIP -->
                    <button class="rewind">
                        <svg @click="rewind" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z"/><g>
                            <path d="M10.89,16h-0.85v-3.26l-1.01,0.31v-0.69l1.77-0.63h0.09V16z"/><path d="M15.17,14.24c0,0.32-0.03,0.6-0.1,0.82s-0.17,0.42-0.29,0.57s-0.28,0.26-0.45,0.33s-0.37,0.1-0.59,0.1 s-0.41-0.03-0.59-0.1s-0.33-0.18-0.46-0.33s-0.23-0.34-0.3-0.57s-0.11-0.5-0.11-0.82V13.5c0-0.32,0.03-0.6,0.1-0.82 s0.17-0.42,0.29-0.57s0.28-0.26,0.45-0.33s0.37-0.1,0.59-0.1s0.41,0.03,0.59,0.1c0.18,0.07,0.33,0.18,0.46,0.33 s0.23,0.34,0.3,0.57s0.11,0.5,0.11,0.82V14.24z M14.32,13.38c0-0.19-0.01-0.35-0.04-0.48s-0.07-0.23-0.12-0.31 s-0.11-0.14-0.19-0.17s-0.16-0.05-0.25-0.05s-0.18,0.02-0.25,0.05s-0.14,0.09-0.19,0.17s-0.09,0.18-0.12,0.31 s-0.04,0.29-0.04,0.48v0.97c0,0.19,0.01,0.35,0.04,0.48s0.07,0.24,0.12,0.32s0.11,0.14,0.19,0.17s0.16,0.05,0.25,0.05 s0.18-0.02,0.25-0.05s0.14-0.09,0.19-0.17s0.09-0.19,0.11-0.32s0.04-0.29,0.04-0.48V13.38z"/></g></g></g></svg>
                    </button>
                    <button class="fast-forward">
                        <svg @click="forward" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><g>
                            <path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z"/><polygon points="10.86,15.94 10.86,11.67 10.77,11.67 9,12.3 9,12.99 10.01,12.68 10.01,15.94"/><path d="M12.25,13.44v0.74c0,1.9,1.31,1.82,1.44,1.82c0.14,0,1.44,0.09,1.44-1.82v-0.74c0-1.9-1.31-1.82-1.44-1.82 C13.55,11.62,12.25,11.53,12.25,13.44z M14.29,13.32v0.97c0,0.77-0.21,1.03-0.59,1.03c-0.38,0-0.6-0.26-0.6-1.03v-0.97 c0-0.75,0.22-1.01,0.59-1.01C14.07,12.3,14.29,12.57,14.29,13.32z"/></g></g></svg>
                    </button>
                    <!-- SPEED -->
                    <button @click="changeSpeed" class="speed-btn text-wide">
                        x{{speed}}
                    </button>
                    <!-- CAPTIONS -->
                    <button >
                        <svg class="subtitle-btn" @click="toggleCaptions" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                        </svg>
                       </button>
                    <!-- FULL SCREEN -->
                    <button class="full-screen-btn">
                        <svg @click="toggleFullScreen" class="open" viewBox="0 0 24 24">
                            <path   fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                        </svg>
                        <svg @click="toggleFullScreen" class="close" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <video @click="togglePlay" v-if="displayVideo" :src="displayVideo.Path" autoplay>
                <track
                label="English"
                kind="captions"
                srclang="en"
                src=""
                default
                />
            </video>
            <p>
            </p>
        </div>
        
    </div>
</template>

<script>
import videoService from '../services/VideoService'
export default {
    name: 'display',
    data(){
        return {
            captions: '',
            displayVideo: null,
            volumeLevel: .25,
            current: 0,
            total: 0,
            isMuted: false,
            speed: 1,
            isScrubbing: false,
            
        }
    },
    async mounted() {
        //GET request for the video
        const videoId = this.$route.params.videoId
        this.displayVideo = (await videoService.show(videoId)).data
        

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
        setInterval(this.getCurrent, 250)

        //Updating timeline
        //setInterval(this.updateTimeline, 100)
        
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
            const videoContainer = document.querySelector(".video-container")
            if(video.paused){
                video.play()
                videoContainer.classList.remove("paused")
            } else {
                video.pause()
                videoContainer.classList.add("paused")
            }
        },

        toggleFullScreen(){
            const videoContainer = document.querySelector(".video-container")
            if (document.fullscreenElement != null){
                document.exitFullscreen()
                videoContainer.classList.add("full-screen")
            } else {
                videoContainer.requestFullscreen()
                videoContainer.classList.remove("full-screen")
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
            const captionsBtn = document.querySelector(".subtitle-btn")
            if(captions.mode === "hidden"){
                captions.mode = "showing"
                captionsBtn.classList.add(".underline")
            } else {
                captions.mode = "hidden"
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
        const timelineContainer = document.querySelector(".timeline-container")
        const percent = video.currentTime / video.duration
        timelineContainer.style.setProperty("--progress", percent)
        
        this.total = this.formatTime(video.duration)
        this.current = this.formatTime(video.currentTime)
        },
        // getTotalTime(){
        // const video = document.querySelector("video")
        // this.total = this.formatTime(video.duration)
        // console.log("total: " + this.total)
        // }
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
        updateTimeline(e){
            const timelineContainer = document.querySelector(".timeline-container")
            const rec = timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.x - rec.x), rec.width) / rec.width
            timelineContainer.style.setProperty("--preview", percent)

            if(this.isScrubbing) {
                e.preventDefault()
                timelineContainer.style.setProperty("--progress", percent)

            }
        },
        toggleScrubbing(e){
            const timelineContainer = document.querySelector(".timeline-container")
            const videoContainer = document.querySelector(".video-container")
            const rec = timelineContainer.getBoundingClientRect()
            const video = document.querySelector("video")
            const percent = Math.min(Math.max(0, e.x - rec.x), rec.width) / rec.width

            this.isScrubbing = (e.buttons & 1) === 1
            videoContainer.classList.toggle("scrubbing", this.isScrubbing)
            let wasPaused
            if(this.isScrubbing){
                e.preventDefault()
                wasPaused = video.paused
                video.pause()
            } else {
                video.currentTime = percent * video.duration

                if(!wasPaused){
                    video.play()
                }
            }

        }
    },
    computed: {
    },
    watch: { 
    }
}


</script>

<style scoped>
video{
     
}
.nav{
    filter: drop-shadow(0px 1px 5px black);
    position: absolute;
    left: 0%;
    z-index: 5;
    bottom: 440px;
}

svg{
    transition: all .3s ease-in-out;
}
svg:hover{
    scale: 1.05;
}

.title{
    position: absolute;
    bottom: 440px;
    right: 50%;
    z-index: 5;
    font-size: 30px;
    filter: drop-shadow(0px 1px 3px black);
}
.video-container{
    position: relative;
    min-width: 90%; 
    display: flex;
    justify-content: center;
    margin-inline: auto;
    /* background-color: black; */
}

.video-controls-container::before{
    content: "";
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, .65), transparent);
    width: 100%;
    aspect-ratio: 6 / 1;
    z-index: -1;
    pointer-events: none;
}
.video-controls-container{
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    color: white;
    z-index: 5;
    opacity: 0;
    transition: all 150ms ease-in-out;
}

.underline{
    border-bottom: 3px solid black;
}

.video-container.full-screen{
    max-height: 100vh;
    max-width: initial;
    width: 100%;
}
.video-container:hover .video-controls-container,
.video-container.paused .video-controls-container,
.video-container:focus-within .video-controls-container{
    opacity: 1;
}

.controls {
    display: flex;
    gap: .5rem;
    padding: .25rem;
    align-items: center;
}

.controls button{
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    height: 30px;
    width: 30px;
    font-size: 1.1rem;
    cursor: pointer;
    opacity: .85;
    transition: opacity 150ms ease-in-out;
}

.text-wide{
    width: 50px
}

.controls button:hover{
    opacity: 1;
}

.video-container.paused .pause-icon{
    display:none;
}

.video-container:not(.paused) .play-icon{
    display:none;
}

.video-container.full-screen .close{
    display:none;
}

.video-container:not(.full-screen) .open{
    display:none;
}

.volume-high-icon, .volume-low-icon, .volume-muted-icon{
    display: none;
}
.volume-high-icon{
    display: block;
}

.volume-low-icon{
    display: block;
}

.volume-muted-icon{
    display: block;
}

.volume-container {
    display: flex;
    align-items: center;
}

.volume-slider{
    width: 0;
    transform-origin: left;
    transform: scaleX(0);
    transition: width 150ms ease-in-out;
}

.volume-container:hover .volume-slider, .volume-slider:focus-within{
    width: 100px;
    transform: scaleX(1)
}

.video-duration-container {
    display: flex;
    align-items: center;
    gap: .25rem;
    flex-grow: 1;
}

.timeline-container {
    height: 7px;
    margin-inline: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.video-container.scrubbing .timeline, .timeline-container:hover .timeline{
    height: 100%
}

.timeline{
    background-color: rgba(100, 100, 100, .5);
    height: 3px;
    width: 100%;
    position: relative;
}
.timeline::before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--preview) * 100%);
    background-color: rgb(150, 150, 150);
    display: none;
}

.timeline::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--progress) * 100%);
    background-color: rgb(22, 49, 145);
}

.timeline .timeline-btn{
    --scale: 0;
    position: absolute;
    transform: translateX(-50%) scale(var(--scale));
    height: 200%;
    top: -50%;
    left: calc(var(--progress) * 100%);
    background-color: rgb(22, 49, 145);
    border-radius: 50%;
    transition: transform 150ms ease-in-out;
    aspect-ratio: 1 / 1;
}

.video-container.scrubbing .timeline::before, .timeline-container:hover .timeline::before{
    display: block;
}

.video-container.scrubbing .timeline, .timeline-container:hover .timeline-btn {
    --scale: 1;
}

</style>