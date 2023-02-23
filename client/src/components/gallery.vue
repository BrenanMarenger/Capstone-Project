<template>
  <div class="gallery">
    <!--NAV BAR -->
    <Navbar  
      @recieveSearch="applySearch($event)" 
      @toggleYearFilter="toggleYearFilter($event)" 
      :yearList="years" 
      :categoryList="categories"/>

    <!--FEATURE-->
    <Feature v-if="videos.length > 1" :videos="videos" 
      :modalActive="modalActive" 
      v-show="hideItems" />

    <!--MODAL-->
    <Modal v-if="modalActive" 
      :videos="videos" 
      :favoritesId="favoritesId" 
      :modal="modal" 
      @receiveModal="updateModal($event)" 
      @recieveToggleModal="toggleModal($event)" 
      @recieveToggleFavorite="toggleFavorites($event)"/>

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
      :favoriteList="favoriteList" />

    <!--ALL-->
    <h2> All {{search}} Videos </h2>
    <div class="all-videos-container">
      <div class="" v-for="video in videos" :key="video.id">
        <div v-show="video.Title.toLowerCase().includes(search.toLowerCase())" > <!-- < and v into a computed function || video.Categories.toLowerCase().includes(search.toLowerCase()) || video.Year.includes(search)-->
          <div v-show="(filteredYears.indexOf(video.Year) != -1) || filteredYears.length == 0"> 

            <h3> {{video.Title}} </h3>
            <router-link :to="{name: 'display', params: {videoId: video.id}}" tag="button">
             Play
            </router-link>
            
            <button @click="toggleModal(video)">
              More Info
            </button>
            <button @click="setFavorite(video.id)" v-if="favoritesId.includes(video.id)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button @click="removeFavorite(video.id)" v-if="!(favoritesId.includes(video.id))">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            </button>
            <img class="all-videos-video" :src="video.Thumbnail" />
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
      modal: {
                "Path": "",
                "Title": "",
                "Categories": "",
                "Description": "",
                "Thumbnail": "",
                "Year": "",
            },
      modalActive: false,
    }
  },
  components: {
    Feature,
    Category,
    Navbar,
    Modal,
    Favorite,
    WatchAgain
  },
  // beforeRouteEnter(to, from, next) {
  //   
  //   
  // },
  async mounted(){
    if(this.$route.query.search){
      this.search = this.$route.query.search
    }
  },
  async created() {
    store.commit('setLoading', true);
    this.videos = (await videoService.getAllVideos()).data   
    this.getYears();
    this.getCategories();
    this.updateFavorites();
    setTimeout(function(){
      store.commit('setLoading', false)
    }, 2500);
    
  },
  methods: {
    applySearch(updateSearch){
      this.search = updateSearch
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
      let favorites = await FavoriteService.index({
        userId: this.$store.state.user.id
        })
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
      } else {
        this.$router.replace({name: "gallery"})
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

//Shows what part of the screen is being viewed
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})
const hiddenVideos = document.querySelectorAll('.hidden')
hiddenVideos.forEach((el) => observer.observe(el))

</script>

<style scoped>

.all-videos-container{
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}

video{
  width: 300px;
}

.all-videos-video{
  width:300px;
}
.all-videos-video:hover{
  scale: 1.1;
}

.hidden {
    opacity: 0;
    filter: blur(5px);
    transition: all 1s;
}

.show {
    opacity: 1;
    filter: blur(0);
}
</style>
