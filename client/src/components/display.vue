<template>
    <div> 
        <!--
        <router-link :to="gallery" tag="button">
            Go Back 
        </router-link>
        -->
        {{ $route.params.video.Title }}
        <div class="video-container"> 
            <div class="video-controls-container">
                <div class="timeline-container"> 
                
                </div>
                <div class="title">

                </div>
                <div class="controls">
                    <button class="playpause-btn">
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
                    <button class="rewind">

                    </button>
                    <button class="fast-forward">
                        
                    </button>
                </div>
            </div>
            <video v-if="video" :src="video.Path" autoplay>
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
export default {
    name: 'Display',
    props: ['video'],
    data(){
        return {
            captions: ''
        }
    },
    mounted() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) //
                {
                    const blob = new Blob([this.responseText], { type: "text,vtt" });
                    this.captions = URL.createObjectURL(blob);
                    document.querySelector('track').src = this.captions
                }
        }
        xmlhttp.open("GET", this.video.Subtitles, true)
        xmlhttp.send();
        
        
        fetch(this.video.Subtitles)
        .then( res => res.text())
        .then( result => {
            // var blob = new Blob([result], {
            //     type: "text,vtt"
            // })
            // const url = window.URL.createObjectURL(blob)
            //console.log(result)
        })
        .catch(error => console.log('error', error));
        
        
    }
}

</script>

<style scoped>
video{
     min-width: 100%; 
     min-height: 100%; 
}

.video-container{
    position: relative;
}

.video-controls-container{
    position: absolute;
    bottom: 0;
    left: 0;
    
    color: white;
    z-index: 5;
    opacity: 0;
    transition: 150ms ease-in-out;
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

</style>