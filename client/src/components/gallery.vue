<template>
  <div class="gallery">
    <!--NAV BAR -->
    <Navbar  @recieveSearch="applySearch($event)" @toggleYearFilter="toggleYearFilter($event)" :yearList="years" :categoryList="categories"/>

    <!--FEATURE-->
    <Feature :videos="videos" :modalActive="modalActive" v-show="!search && filteredYears.length ==0" />

    <!--MODAL-->
    <Modal v-if="modalActive" :videos="videos" :modal="modal" @recieveToggleModal="toggleModal($event)" @recieveToggleFavorite="toggleFavorites($event)"/>

    <!--CATEGORIES-->
    <div v-for="category in categories" :key="category" > 
      <Category v-show="!search && filteredYears.length ==0" :videos="videos" :currentCategory="category" @recieveToggleModal="toggleModal($event)" @recieveToggleFavorites="toggleFavorites($event)"/> <!--<button @click="toggleFavorites(video)">⭐</button>-->
    </div>

    <!--FAVORITES-->
    <Favorite v-show="!search && filteredYears.length ==0" @recieveToggleFavorites="toggleFavorites($event)" :favoriteList="favoriteList" />

    <!--ALL-->
    <h2> All {{search}} Videos </h2>
    <div class="all-videos-container">
      <div class="" v-for="video in videos" :key="video.Path">
        <div v-show="video.Title.toLowerCase().includes(search.toLowerCase())" > <!-- < and v into a computed function-->
          <div v-show="(filteredYears.indexOf(video.Year) != -1) || filteredYears.length == 0"> 
            <h3> {{video.Title}} </h3>
            <router-link :to="{name: 'display', params: {video: video}}" tag="button">
             Play
            </router-link>
            <button @click="toggleModal(video)">
              More Info
            </button>
            <button @click="toggleFavorites(video)">⭐</button>
            <img class="all-videos-video" :src="video.Thumbnail" />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import videoService from '@/services/VideoService'
import videosJson from '../assets/video-config.json'
import Feature from "./galleryComponents/feature.vue"
import Category from "./galleryComponents/category.vue"
import Navbar from "./galleryComponents/navbar.vue"
import Modal from "./galleryComponents/modal.vue"
import Favorite from "./galleryComponents/favorite.vue"

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
    Favorite
  },
  async mounted(){
    //this.videos = await videoService.getAllVideos() // .then
    this.getYears();
    this.getCategories()
  },
  async created() {
    this.videos = videosJson.videos;
    
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
    },

    toggleFavorites(video){
      let index = this.favoriteList.indexOf(video);
            if (index != -1) {
                this.favoriteList.splice(index, 1);
            } else {
                this.favoriteList.push(video);
            }
    },

    toggleModal(video) {
            this.modal.Title = video.Title;
            this.modal.Description = video.Description
            this.modal.Path = video.Path
            this.modal.Categories = video.Categories
            if(this.modalActive == true){
              this.modalActive = false;
              //play the feature
            } else {
              this.modalActive = true;
              //pasuse the feate
            }
    },

    toggleYearFilter(year){
      let index = this.filteredYears.indexOf(year)
      if(index != -1){
        this.filteredYears.splice(index, 1)
      } else {
        this.filteredYears.push(year)
      }
    }
  },
  computed: {
    searchVideos(){
      return this.videos.filter(video =>
                video.Title.toLowerCase().includes(this.search.toLowerCase()))
    },
    
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
