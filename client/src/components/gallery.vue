<template>
  <div class="gallery">
    <!--NAV BAR -->
    <Navbar  
      @recieveSearch="applySearch($event)" 
      @toggleYearFilter="toggleYearFilter($event)" 
      :yearList="years" 
      :search="search"
      :filteredYears="filteredYears"
      @recieveResetFilters="resetFilters()"
      />

      <!-- TOP 5 -->
    <div v-show="hideItems" class="top5">
      <h1>Top 5 Films</h1>
      <div class="top5-container">
        <div class="top5-item" v-for="(video, index) in topRated" :key="video.title">
          <span class="top5-number">
            {{ index +1}}
          </span>
          <img class="top5-video" @click="toggleModal(video)" :src="video.Thumbnail"/>
          <span class="top5-controls">
            <div class="top5-title">
              {{ video.Title }}
            </div>
            <router-link class="play" :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                <svg viewBox="0 0 24 24" >
                  <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              </router-link>
            <button class="top5-fav" @click="removeFavorite(video.id)" v-if="favoritesId.includes(video.id)">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button class="top5-fav" @click="setFavorite(video.id)" v-if="!(favoritesId.includes(video.id))">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            </button>
            <button class="top5-more-info" @click="toggleModal(video)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </button>
            
            <div class="top5-categories">
              {{ video.Categories }}
            </div>
          </span>
        </div>
      </div>
    </div>

    <!--FEATURE-->
    <Feature v-if="videos.length > 1" :videos="videos" 
      :modalActive="modalActive"
      :isFeaturePlaying="isFeaturePlaying" 
      v-show="hideItems" 
      @recieveToggleModal="toggleModal($event)"
      @recieveFeatureStatus="setFeatureStatus()"
      />

    <!--MODAL-->
    <transition name="fade">
      <Modal v-if="modalActive" 
        :videos="videos" 
        :favoritesId="favoritesId" 
        :modal="modal" 
        @receiveModal="updateModal($event)" 
        @recieveToggleModal="toggleModal($event)" 
        @recieveToggleFavorite="toggleFavorites($event)"/>
    </transition>

  <div class="below-container">
      
      <!--CATEGORIES-->
      <div v-for="category in categories" :key="category" > 
        <Category v-show="hideItems" 
          :videos="videos" 
          :favoritesId="favoritesId" 
          :currentCategory="category" 
          @recieveToggleModal="toggleModal($event)" 
          @recieveToggleFavorites="toggleFavorites($event)"/>
      </div>

      <!-- Watch again -->
      <div class="watch-again" v-show="hideItems" > 
        <WatchAgain 
          :videos="videos" 
          :favoritesId="favoritesId" 
          @recieveToggleModal="toggleModal($event)" 
          @recieveToggleFavorites="toggleFavorites($event)"/>
      </div>
      <!--FAVORITES-->
      <Favorite v-show="hideItems" 
        @recieveToggleFavorites="toggleFavorites($event)"
        @recieveToggleModal="toggleModal($event)" 
        :favoriteList="favoriteList"
        :favoritesId="favoritesId" 
        />

      <!--ALL-->
      
      <div class="all-videos-container">
        <h1> All {{search}} Videos </h1>
        <br>
        <div class="" v-for="video in videos" :key="video.id">
          <!-- Search -->
          <div v-show="video.Title.toLowerCase().includes(search.toLowerCase())" >
            <!-- Filter -->
            <div v-show="(filteredYears.indexOf(video.Year) != -1) || filteredYears.length == 0"> 
              <div class="all-videos-item">

                <img :src="video.Thumbnail" @click="toggleModal(video)"/>

                <div class="all-videos-item-controls">
                  <div class="all-videos-title">
                    {{ video.Title }}
                  </div>
                  <router-link class="play" :to="{name: 'display', params: {videoId: video.id}}" tag="button">
                    <svg viewBox="0 0 24 24" >
                      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </router-link>

                  <button class="more-info" @click="toggleModal(video)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  </button>

                  <button class="fav" @click="removeFavorite(video.id)" v-if="favoritesId.includes(video.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                  <button class="fav" @click="setFavorite(video.id)" v-if="!(favoritesId.includes(video.id))">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                  </button>
                  <div class="all-videos-categories">
                    {{ video.Categories }}
                  </div>
                </div>
                
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import videoService from '@/services/VideoService'
import FavoriteService from '@/services/FavoriteService'
import Feature from "./galleryComponents/feature.vue"
import Category from "./galleryComponents/category.vue"
import Navbar from "./galleryComponents/navbar.vue"
import Modal from "./galleryComponents/modal.vue"
import Favorite from "./galleryComponents/favorite.vue"
import WatchAgain from "./galleryComponents/watchAgain.vue"
import {mapState} from 'vuex'
import store from '../store/store'

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
// import { vIntersectionObserver } from '@vueuse/components'

export default {
  name: 'gallery',
  data () {
    return {
      videos: [],
      search: '',
      categories: [],
      years: [],
      filteredYears: [],
      favoriteList: [],
      favorites: [],
      favoritesId: [],
      topRated: [],
      modal: {
                "Path": "",
                "Title": "",
                "Categories": "",
                "Description": "",
                "Thumbnail": "",
                "Year": "",
            },
      modalActive: false,
      isFeaturePlaying: false,
      interval: null,
    }
  },
  setup(props, context){
    const item = ref(null)
    const itemIsVisible = ref(false)
    
    const {stop} = useIntersectionObserver(item, ([{ isIntersecting }], observerElement) => {
      itemIsVisible.value = isIntersecting
      //emit change to fade in item, only once
      })
    
      return {item, itemIsVisible}
  },
  components: {
    Feature,
    Category,
    Navbar,
    Modal,
    Favorite,
    WatchAgain
  },
  async mounted(){
    if(this.$route.query.search){
      this.search = this.$route.query.search
    }

    this.interval = setInterval(() =>{
      if(this.isFeaturePlaying == true){
        store.commit('setLoading', false)
        clearInterval(this.interval)
        document.body.style.overflowY = "scroll";    

      }
    }, 100); 
  },
  async created() {
    store.commit('setLoading', true);   
    this.videos = (await videoService.getAllVideos()).data  
    await this.parseRating();
    this.getYears();
    this.getCategories();
    this.updateFavorites();
    
  },
  methods: {
    setFeatureStatus(){
      this.isFeaturePlaying = true;
    },
    applySearch(updateSearch){
      this.search = updateSearch
    },
    resetFilters(){
      this.search= ''
      this.filteredYears = []
    },

    getYears(){
      for(let i in this.videos){
        if(this.years.includes(this.videos[i].Year) === false){
          this.years.push(this.videos[i].Year)
        }
      }
      this.years = this.years.sort();
    },

    getCategories(){
      for(let i in this.videos){
        let catStrings = this.videos[i].Categories
        let catArr = catStrings.split(',')
        for(let j =0; j < catArr.length; j++){
          catArr[j] = catArr[j].replace(/\s+/g, '')
          if(this.categories.includes(catArr[j]) === false){
              this.categories.push(catArr[j])
          }
        }
      }
      
      //Shuffle
      for(let i = this.categories.length - 1;i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.categories[i]
            this.categories[i] = this.categories[j];
            this.categories[j] = temp;
        }
    },
    //Rating System
    async parseRating(){ 
      let ratings = (await FavoriteService.getAllFavorites()).data
      let ratingObject = {}
      for(let video in ratings){
        if((ratingObject[ratings[video].VideoId]) == null){
          ratingObject[ratings[video].VideoId] = 1;
        } else{
          ratingObject[ratings[video].VideoId] += 1;
        }
      }
      let ratingArray =[]
      for(var videoId in ratingObject){
        ratingArray.push([videoId, ratingObject[videoId]])
      }
      let topFive = ratingArray.sort((a,b) => {
        return b[1] - a[1];
      })
      this.topRated[0] = (await videoService.show(topFive[0][0])).data
      this.topRated[1] = (await videoService.show(topFive[1][0])).data
      this.topRated[2] = (await videoService.show(topFive[2][0])).data
      this.topRated[3] = (await videoService.show(topFive[3][0])).data
      this.topRated[4] = (await videoService.show(topFive[4][0])).data
      
    },
    //Favorites
    toggleFavorites(video){
      if(this.favoritesId.includes(video.id)){
        this.removeFavorite(video.id)
      } else {
        this.setFavorite(video.id)
      }
    },

    async setFavorite(videoId){ 
      try{
         await FavoriteService.post({
        VideoId: videoId,
        UserId: this.$store.state.user.id
        })
        this.updateFavorites()
      } catch(err) {
        console.log(err)
      }
      
    },
    async removeFavorite(videoId){
      try{
         await FavoriteService.delete({
        VideoId: videoId,
        UserId: this.$store.state.user.id
        })
        this.updateFavorites()
      } catch(err) {
        console.log(err)
      }
      
    },
    async updateFavorites(){
      try{
      let favorites = await FavoriteService.show(this.$store.state.user.id)
        this.favorites = favorites.data
        this.favoriteList = [];
        for(let fav of this.favorites){
          this.favoriteList.push((await videoService.show(fav.VideoId)).data)
        }
    
        this.favoritesId = this.favoriteList.map(fav => fav.id)        
    } catch (err) {
      console.log(err)
    }
    },
    //Modal
    toggleModal(video) {
            this.modal = video;
            if(this.modalActive == true){
              this.modalActive = false;
            } else {
              this.modalActive = true;
            }
    },

    updateModal(video){
      this.modal = video
    },
    //Filter/Search
    toggleYearFilter(year){
      let index = this.filteredYears.indexOf(year)
      if(index != -1){
        this.filteredYears.splice(index, 1)
      } else {
        this.filteredYears.push(year)
      }
    },
  },
  watch: {
    //Query urls
    
    search(){
      if(this.search == ''){
        this.$router.replace({name: "gallery"})
      } else {
        this.$router.replace({query: {search: this.search}})
      }
    },
    // '$route.query.filter': {
    //   immediate: true,
    //   handler (value) {
    //     this.filteredYears = value //might have to add to the array
    //   }
    // },

    filteredYears(){
      this.$router.replace({query: {filter: this.filteredYears}})
      
    },

    modalActive(){
      if(this.modalActive){
        this.$router.replace({query: {video: this.modal.Title.toLowerCase()}})
        document.body.style.overflowY ="hidden"
      } else {
        this.$router.replace({name: "gallery"})
        document.body.style.overflowY = "scroll";    

      }
    },
  },
  computed: {
    searchVideos(){
      return this.videos.filter(video =>
                video.Title.toLowerCase().includes(this.search.toLowerCase()))
    },
    hideItems(){
      return (!this.search && this.filteredYears.length ==0)
    },
    ...mapState([
      'isLoggedIn'
    ])
  }, 
}

</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  scale: .9;
  opacity: 0;
}

.gallery{
  background: rgb(35, 35, 35);
}

h1{
  color: white;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
}
.all-videos-container{
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: center;
  padding-top: 20px;
  border: 2px solid blue;
  height: auto;
  
  
}

.all-videos-container h1{
  position: relative;
  flex-basis: 100%;
  color: white;
  font-size: 25px;
  margin-left: 20px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);
  
  border: 2px solid green;
}

video{
  width: 200px;
  border-radius: 2px;

}

.all-videos-item img{
  width:250px;
  padding: .7rem;
  transition: all .2s ease-in-out;
  filter: drop-shadow(0px 3px 3px black);
  border-radius: 2px;
  aspect-ratio: 4 / 3;
}

.all-videos-item:hover{
  transition: all .5s ease-in-out;
  transform: translateY(-60px);
  scale: 1.2;
  cursor: pointer;
  z-index: 6;
}

.all-videos-item{
  transition: all .2s ease-in-out;
}

.all-videos-item-controls{
  position:relative;
    display: none;
    background: rgb(61, 61, 61);
    width: 250px;
    border-radius: 3px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding-bottom: 60px;
    height: 50px;
    top: -15px;
    left: 11px;
    font-family: 'Rubbik', Arial;
}

.all-videos-item:hover .all-videos-item-controls{
  transition: all .5s ease-in-out;
  display: block;
  
}

.all-videos-categories{
  position: absolute;
  bottom: 9%;
  left: 7%;
  color: gray;
  font-size: 12px;

}
.all-videos-title{
  color: white;
  font-weight: 700;
  font-size: 20;
  padding: 9px;
  margin: 1px;

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
  position: absolute;
  top: 30%;
  left: 5%;
}

.all-videos-item-controls button:hover{
    opacity: 1;
    scale: 1.05;
    transition: all .2s ease-in-out;
}

/* Top 5 */
.top5-container{
  display: flex;
  left: 5%;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  height: 200px;
}
.top5-video {
width: 250px;
display: flex;
margin: 5px;
filter: drop-shadow(0px 3px 3px black);
border-radius: 2px;


}

.top5{
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 200px;
  top: 85%;

  background: linear-gradient(to top, rgb(35, 35, 35)40%, rgba(0,0,0,0) );
}

.top5 h1{
  font-size: 25px;
  position: absolute;
  top: -30%;
  margin-left: 20px;
  filter: drop-shadow(2px 2px 4px black);

}
.top5-container .top5-number{
  z-index: 11;
  position:absolute;
  display: flex;
  justify-content:space-between;  
  color:black;
  font-weight: 700;
  transform: translateX(-30px);
}

.top5-number{
  display: flex;
  flex-direction: row;
  font-size: 200px;
  font-family: 'Rubbik', Arial;
  text-shadow:
   -1px -1px 0 grey,  
    1px -1px 0 grey,
    -1px 1px 0 grey,
     1px 1px 0 grey;
  transition: all .2s ease-in-out;

  
}

.top5-item{
  transition: all .2s ease-in-out;

}
.top5-item:hover{
  transition: all .5s ease-in-out;
  transform: translateY(-60px);
  scale: 1.2;
  margin: 0 15px;
  cursor: pointer;

}

.top5-item:hover .top5-number{
  transition: all .5s ease-in-out;
  opacity: 0;
  z-index: 0;
}

/* Buttons */

.top5-item:hover .top5-controls{
  transition: all .5s ease-in-out;
  display: block;
  filter: drop-shadow(2px 2px 4px black);


}

.top5-controls{
  position:relative;
  display: none;
  background: rgb(61, 61, 61);
  width: 255px;
  border-radius: 3px;
  padding-bottom: 60px;
  height: 50px;
  top: -5px;
  left: 2px;
  font-family: 'Rubbik', Arial;
}
.top5-controls svg{
  width: 24px;
}

.top5-controls .play{
  position: absolute;
  top: 30%;
  left: 5%;
}

.top5-controls .top5-more-info{
  position: absolute;
  right: 2%;
  top: 30%;

}

.top5-controls .top5-fav{
  position: absolute;
  right: 20%;
  top: 30%;
}

.top5-title{
  color: white;
  font-weight: 700;
  font-size: 20;
  padding: 9px;
  margin: 1px;
}

.top5-categories{
  position: absolute;
  bottom: 9%;
  left: 5%;
  color: gray;
  font-size: 12px;
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
}

.top5-controls button:hover{
  scale: 1.03;
  opacity: 1;
}
.play{
  color: black !important;
  background: white !important;
  border: solid 1px white !important;
}
.play button{
  background: white !important;
}

.below-container{
  
  position: absolute;
  top: 100%;
  background: rgba(0,0,0,0);
  

}

.below-container h1{
}


</style>
