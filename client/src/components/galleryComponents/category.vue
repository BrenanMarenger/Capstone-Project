<template>
    <div class="body"> 
        <h1> {{ currentCategory }}</h1>
        
        

        <div  class="category-container"> 
            <div class="side-buttons">
                <svg 
                v-show="sideScroller == 0" 
                class="left-arrow" 
                @click="scrollLeft"
                xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/></svg>
            </div>

            <div :id="currentCategory" class="slider">
                <div class="index-bar">
                    
                </div>
                <div v-for="(video,  index) in catVideos" :key="video.Path" class="item">   
                        <h1 v-if="(index % 6) == 0 && index != 0"> {{ (index % 6) + 1 }}</h1>                   
                        <img :src="video.Thumbnail" @click="sendToggleModal(video)"/>
                        <div class="category-controls">
                            <div class="item-title">
                                {{ video.Title }}
                            </div>
                            <router-link class="play" :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                                <svg viewBox="0 0 24 24" >
                                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                            </router-link>
                            <button class="more-info" @click="sendToggleModal(video)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            </button>
                            <button class="fav" @click="sendToggleFavorite(video)" v-if="favoritesId.includes(video.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </button>
                            <button class="fav" @click="sendToggleFavorite(video)" v-if="!(favoritesId.includes(video.id))">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                            </button>
                            <div class="item-categories">
                                {{ video.Categories }}
                            </div>
                        </div> 
                </div>
            </div>
            
            <div class="side-buttons">
                <svg  
                @click="scrollRight"
                class="right-arrow" 
                xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['currentCategory','videos', 'favoritesId'],
    data(){
        return {
            catVideos: [],
            sideScroller: 0,
            left: 0,
            right: 0,
        }
    },
    mounted(){
        for(let vid of this.videos){
            if(vid.Categories.includes(this.currentCategory)){
                this.catVideos.push(vid)
            }
        }

        //SHUFFLE ITEMS
        for(let i = this.catVideos.length - 1;i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.catVideos[i]
            this.catVideos[i] = this.catVideos[j];
            this.catVideos[j] = temp;
        }
  },
  methods: {
    sendToggleFavorite(video){
            this.$emit('recieveToggleFavorites', video)
    },
    sendToggleModal(video){
        this.$emit('recieveToggleModal', video)
    },
    scrollLeft(){

        let scroll = document.getElementById(this.currentCategory) //gives me the slider for specific cat
        let sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
        if(sliderIndex == 0){
            console.log("Jump all the way right!")
        } else {
            scroll.style.setProperty("--slider-index", sliderIndex - 1)

        }
        
    
    },
    scrollRight(){
        let scroll = document.getElementById(this.currentCategory) //gives me the slider for specific cat
        let sliderIndex = parseInt(getComputedStyle(scroll).getPropertyValue("--slider-index"))
        console.log(sliderIndex)

        scroll.style.setProperty("--slider-index", sliderIndex + 1)
    
    }
  },
  
}
</script>

<style scoped>

h1{
  color: white;
  font-size: 25px;
  margin-left: 20px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);
  padding: 10px;
  z-index: 0;

}
img{
    width: 250px;
    display: flex;
    filter: drop-shadow(0px 3px 3px black);
    border-radius: 2px;
    aspect-ratio: 4 / 3;
}

.item{
    flex: 0 0 12%;
    padding: .25rem;
    max-width: 12%;
}

.item:hover{
    transition: all .5s ease-in-out;
  transform: translateY(-60px);
  scale: 1.2;
  cursor: pointer;
  z-index: 500;
}

.category-container{
    display: flex;
    justify-content: center;
}

.slider{
    --slider-index: 0;
    display: flex;
    width: calc(100% - 10rem);
    height: 200px;
    transition: all .5s ease-in-out;
    transform: translateX(calc(var(--slider-index) * -24%));

}

svg{
    width: 24px;
}


.item:hover .category-controls{
    transition: all .5s ease-in-out;
    display: block;
    filter: drop-shadow(2px 2px 4px black);
}
.category-controls{
    position:relative;
    display: none;
    background: rgb(61, 61, 61);
    width: 255px;
    border-radius: 3px;
    padding-bottom: 60px;
    height: 50px;
    top: -5px;
    left: -2px;
    font-family: 'Rubbik', Arial;
    z-index: 100;
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

/* Scroll buttons */

.side-buttons{
    position: absolute;
    width: 100vw;
    display: flex;
    left: 0;
    margin-top: -5px;
    
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
    background: rgba(0,0,0,.4);
    opacity: .1;
    height: 200px;
    z-index: 5;
    border-radius: 1rem;
    transition: all .3s ease-in-out;

}

.left-arrow:hover, .right-arrow:hover{
    opacity: 1;
    transition: all .3s ease-in-out;
    cursor: pointer;
    background: rgba(0,0,0,.6);
    width: 90px;


}
.category-container:hover .side-buttons .left-arrow, .category-container:hover .side-buttons .right-arrow{
    opacity: .4;
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
</style>