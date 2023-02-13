<template>
    <div > 
        <div class="video-container"> 
            <div class="video-controls-container" >
                <div class="title">

                </div>
                <div class="controls">
                    <button class="playpause-btn" >
                        <svg @click="togglePlay" class="play-icon"  viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg @click="togglePlay" class="pause-icon" viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
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
                    <div class="video-duration-container">
                        <div class="current-time">
                            {{ current }}
                        </div>
                        /
                        <div class="total-time">
                            {{ total }}
                        </div>
                    </div>
                    <button class="rewind">

                    </button>
                    <button class="fast-forward">
                        
                    </button>
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
                kind="subtitles"
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
            isMuted: false
            
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
        setInterval(this.getCurrent, 500)
        //this.getTotalTime()

        
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
        this.total = this.formatTime(video.duration)
        this.current = this.formatTime(video.currentTime)
        },
        // getTotalTime(){
        // const video = document.querySelector("video")
        // this.total = this.formatTime(video.duration)
        // console.log("total: " + this.total)
        // }
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

svg{
    transition: all .3s ease-in-out;
}
svg:hover{
    scale: 1.05;
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
    background: linear-gradient(to top, rgba(0, 0, 0, .75), transparent);
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
    transition: 150ms ease-in-out;
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
    cursor: pointer;
    opacity: .85;
    transition: opacity 150ms ease-in-out;
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
    transition: transform 150ms ease-in-out;

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


</style>