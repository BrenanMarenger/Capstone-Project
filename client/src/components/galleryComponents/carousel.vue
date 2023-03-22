<template>

<div>
    <!-- Index Counter -->
    <div class="index-container" v-if="numIndexes > 1">
            <div v-for="index in (numIndexes + 1)" class="index" @click="changeIndex(index)">
                <div v-show="((sliderIndex + 1) == index) " class="current-index">
                
                </div>
            </div>
    </div>

    <div class="carousel-container">
        <!-- Left Button -->
        <div class="side-buttons" v-show="numIndexes > 1">
                <svg  
                class="left-arrow" 
                @click="scrollLeft($event)"
                xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/></svg>
        </div>
        

        <div class="slider" :id="sectionTitle">
            <div v-for="video in carouselVideos" class="item">
                <img :src="video.Thumbnail" />
                <!-- History bar -->
                <div class="history-bar" v-if="sectionTitle == 'watchagain'">
                    <div class="watched-bar" :style="{'width': video.Spot}"></div>
                </div>

                <!-- Hover Menu -->
                <div class="carousel-controls">
                    <!-- Title -->
                    <div class="item-title">
                        {{ video.Title }}
                    </div>
                    <!-- Play btn -->
                    <router-link class="play" :to="{name: 'display',  params: {videoId: video.id}, query: { time: video.Spot }}" tag="button">
                        <svg viewBox="0 0 24 24" >
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                    </router-link>
                    <!-- Modal Btn -->
                    <button class="more-info" @click="sendToggleModal(video)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </button>
                    <!-- Favorite btn -->
                    <button class="fav" @click="sendToggleFavorite(video)" v-if="favoritesId.includes(video.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                    <button class="fav" @click="sendToggleFavorite(video)" v-if="!(favoritesId.includes(video.id))">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                    </button>
                    <!-- Categories -->
                    <div class="item-categories">
                        {{ video.Categories }}
                    </div>
                </div>
            </div>

            
        </div>
        
        <!-- Right Button -->
        <div class="side-buttons" v-show="numIndexes > 1">
                <svg  
                @click="scrollRight($event)"
                class="right-arrow" 
                xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>
        </div>
        

    </div>
    
</div>
</template>

<script>
export default{
    name: 'Carousel',
    props: ['carouselVideos', 'favoritesId', 'sectionTitle'],
    data(){
        return{
            sliderIndex: 0,
            numberOfVideos: 0,
            numIndexes: 0,
        }
    },
    methods:{
        //Button Actions
        sendToggleFavorite(video){
            this.$emit('recieveToggleFavorites', video)
        },
        sendToggleModal(video){
            this.$emit('recieveToggleModal', video)
        },
        //Scrollers
        scrollLeft(e){
            let scroll = document.getElementById(this.sectionTitle)
            this.sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
            if(this.sliderIndex == 0){
        
                scroll.style.setProperty("--slider-index", this.sliderIndex + this.numIndexes)

            } else {
                scroll.style.setProperty("--slider-index", this.sliderIndex - 1)

            }
            this.sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
        },
        scrollRight(e){
            let scroll = document.getElementById(this.sectionTitle)
            this.sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
            if(this.sliderIndex >= this.numIndexes){
                scroll.style.setProperty("--slider-index", this.sliderIndex - this.numIndexes)
            } else {
                scroll.style.setProperty("--slider-index", this.sliderIndex + 1)
            }
            this.sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
        },
        //Index Counter
        updateNumIndexes(e){
            let screenWidth 
            if(e.target) {
                screenWidth = e.target.innerWidth
            } else{
                screenWidth = window.screen.width
                
            }
        
            if(screenWidth > 1900){ //7 on screen
                this.numIndexes = Math.ceil( this.carouselVideos.length / 7 )
            } else if(screenWidth > 1680){ //6 on screen
                this.numIndexes = Math.ceil( this.carouselVideos.length / 6 )
            } else if(screenWidth > 1500){ //5 on screen
                this.numIndexes = Math.ceil( this.carouselVideos.length / 5 )
            } else if(screenWidth < 1300){ //4 or less
                this.numIndexes = Math.ceil( this.carouselVideos.length / 4 )
            }
            
        },
        changeIndex(index){//for clicking the tabs 
            let scroll = document.getElementById(this.sectionTitle)  
            this.sliderIndex = index - 1
            scroll.style.setProperty("--slider-index", this.sliderIndex) 
        }   

    },
    created(){
        window.addEventListener("resize", this.updateNumIndexes);
    },
    destroyed(){
        window.removeEventListener("resize", this.updateNumIndexes);
    },
    mounted(){
        setTimeout(()=>{
            this.updateNumIndexes(window.screen.width)
        }, 1000)
        
    }
}
</script>

<style scoped>

img{
    width: 250px;
    display: flex;
    border-radius: 2px;
    aspect-ratio: 4 / 3;
}
.item{
    padding: .7rem;
    max-width: 12%;
    transition: all .2s ease-in-out;
    filter: drop-shadow(0px 3px 3px black);

}

.item:hover{
    transition: all .5s ease-in-out;
  transform: translateY(-60px);
  scale: 1.2;
  cursor: pointer;
  z-index: 6;
  
}

.carousel-container{
    display: flex;
    justify-content: center;
    padding-bottom: 35px;
}

.slider{
    --items-per-screen: 6;
    --slider-index: 0;
    display: flex;
    position: relative;
    left: -20px;
    top: -6px;
    width: calc(100% - 10rem);
    height: 200px;
    transition: all .5s ease-in-out;
    transform: translateX(calc(var(--slider-index) * -25%));

}

/* Controls menu */
.item:hover .carousel-controls{
    transition: all .5s ease-in-out;
    display: inline-block;
    
}
.carousel-controls{
    position:relative;
    display: none;
    background: rgb(61, 61, 61);
    width: 250px;
    border-radius: 3px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding-bottom: 60px;
    height: 50px;
    top: -5px;
    font-family: 'Rubbik', Arial;
}

.item-title{
    color: white;
  font-weight: 700;
  font-size: 20;
  padding: 9px;
  margin: 1px;
}

.item-categories{
    position: absolute;
  bottom: 9%;
  left: 5%;
  color: gray;
  font-size: 12px;
}

/* Menu buttons */


.fav{
  position: absolute;
  right: 20%;
  top: 30%;
}
.more-info{
  position: absolute;
  right: 2%;
  top: 30%;

}

.play{
  color: black !important;
  background: white !important;
  border: solid 1px white !important;
}

.play{
  position: absolute;
  top: 30%;
  left: 5%;
}

button{
    background: rgb(74, 74, 74);
    color: white;
    border: solid 2px grey;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    padding: 5px;
    cursor: pointer;
    opacity: .8;
    transition: all .2s ease-in-out;

}

button:hover{
    opacity: 1;
    scale: 1.05;
    transition: all .2s ease-in-out;
}
/* Scroll Buttons */
.side-buttons{
    position: absolute;
    width: 100vw;
    display: flex;
    left: 0;
    
    
}

.side-buttons svg{
    
    width: 70px;

}
.side-buttons .right-arrow{
    position: absolute;
    right: -.5%;
    padding-left: 0;
    padding-right: 10px;
}

.side-buttons .left-arrow{
    left: 0;
    padding-right: 0;
    padding-left: 10px;
}
.left-arrow, .right-arrow{
    position: relative;
    top: 0%;
    z-index: 6;
    width: 70px;
    background: rgba(0,0,0,.3);
    opacity: .1;
    height: 200px;
    border-radius: 1rem;
    transition: all .3s ease-in-out;

}

.left-arrow:hover, .right-arrow:hover{
    opacity: 1;
    transition: all .3s ease-in-out;
    cursor: pointer;
    background: rgba(0,0,0,1) !important;
    width: 90px;


}
.carousel-container:hover .side-buttons .left-arrow, .carousel-container:hover .side-buttons .right-arrow{
    opacity: .5;
    transition: all .3s ease-in-out;
}
.left-arrow{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    
}
.right-arrow{ 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    
}

/* Index counter */
.index{
    position: relative;
    top:0%;
    width: 30px;
    height: 5px;
    background-color: grey;
    z-index: 2;
    margin: 5px;
    cursor: pointer;
    border-radius: 3px;
}
.current-index{
    position: absolute;
    top: -5px;
    left: -5px;
    width: 35px;
    height: 8px;
    background-color: white;
    
    margin: 3px;
    border-radius: 3px;

}
.index-container{
    display: flex;
    flex-direction: row;
    position: relative;
    
    left: 85vw;
    z-index: 0;
}
/* History Bar */
.history-bar{
    position: relative;
    top: -4px;
    width: 250px;
    height: 1vw;
    max-height: 7px;
    background: #5b5b5b;
}

.watched-bar{
    height: 1vw;
    max-height: 7px;
    width: 10%;
    background: red

}

</style>