<template>
    <div class="body" id="narbar">
        <span id="navbar-container" class="navbar-container">
            <div> 
                <img src="https://d3dg8a58k5opnp.cloudfront.net/logo.png">
            </div>
            
            <!--Filtering-->
            <div class="filter-container"> 
                <button class="filter-btn" @click="showFilters">Filter</button>
                
                <ul class="filter-list"
                    :class="{filterToggle: isFiltering}"
                    id="filterList"
                >
                    <div v-for="year in yearList" :key="year" >
                        <li>
                            <input type="checkbox" class="filter-item" @click="toggleYearFilter(year)">
                            <label>{{ year }}</label>
                        </li>
                    </div>
                </ul>
            </div>
            
            <!--Searching-->
            <div ref="search" class="search-container"> 
                <svg 
                id="searchIcon"
                :class="{searchIconToggle: isSearching}" 
                @click="openSearch" 
                class="search-icon" 
                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            
                <input 
                id="searchBox"
                class="search-box"
                :class="{searchToggle: isSearching}" 
                type="text" placeholder="Search by title..." 
                v-model="navSearch" 
                @keydown.enter="sendSearch"
                >
            </div>
            <!-- Reset filters -->
            <div class="reset-container"> 
                <button @click="sendResetFilters" v-if="filteredYears.length > 0 || navSearch.length > 0" >Clear Filters</button>
            </div>
            
            <!-- Sign out -->
            <div class="signout-container">
                <button v-if="$store.state.isLoggedIn" @click="logout">Sign out</button>

            </div>
        </span>
        <transition name="fade">
            <div class="cover" v-show="scollPosition != 0 || isFiltering || isSearching"></div>
        </transition>
    </div>

</template>

<script>
import {ref} from 'vue'
import {onClickOutside} from '@vueuse/core'
export default {
    name: 'Navbar',
    props: ['categoryList', 'yearList', 'filteredYears', 'search'],
    setup(){
        const search = ref(null)
        const isSearching = ref(false)

        onClickOutside(search, (event) => console.log("clicked outside"))
        return { search }
    },
    data() {
        return {
            navSearch: '',
            currentUser: '',
            isSearching: false,
            isFiltering: false,
            scollPosition: 0,
        }
    },
    mounted(){
        this.currentUser = this.$store.state.user.id
        this.onScroll
        window.addEventListener("scroll", this.onScroll)

    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
    },
    methods: {
        onScroll(e){
            const navbar = document.getElementById("narbar")
            const container = document.getElementById("navbar-container")

            this.scollPosition = window.pageYOffset

            // if(window.pageYOffset == 0){
            //     navbar.style.background = "rgba(0,0,0,0)"
            // } else {
            //     navbar.style.background = "black"
            // }

        },
        openSearch(){
            const narbar = document.getElementById("narbar")

           this.isSearching = !this.isSearching;
        //    if(this.isSearching){
        //     narbar.style.background = "black"
        //    }
        },
        sendSearch() {
            this.$emit('recieveSearch', this.navSearch)
        },
        toggleYearFilter(year) {
            this.$emit('toggleYearFilter', year)
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'start'
            })
        },
        showFilters(){
            const narbar = document.getElementById("narbar")
            this.isFiltering = !this.isFiltering
            // if(this.isFiltering){
            //     narbar.style.background = "black"
            // }

        },
        sendResetFilters(){
            document.querySelectorAll('input[type="checkbox"]')
            .forEach(el => el.checked = false);
            this.navSearch = ''
            if(this.isFiltering){
                this.isFiltering = false
            }
            if(this.isSearching){
                this.isSearching = false
            }
            //this.showFilters()
            //this.openSearch()
            
            this.$emit('recieveResetFilters')
        }
    },
    watch:{

    }

}
</script>

<style scoped>
.body {
    position: fixed;
    top:0;
    z-index: 100;
    width: 100%;
    font-family: 'Rubbik', Arial;
    
    display: flex;
    padding: 20px;
    height: 40px;
    left: 0;
    justify-content: space-between;
    background: rgba(0,0,0,0);
    transition: all .5s ease-in-out;

}

.cover{
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    z-index: 5;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(35,35,35,1));
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.navbar-container{
    z-index: 10;
}

button{
    height: 30px;
    cursor: pointer;
    background: none;
    color: white;
    border: none;
    font-size: 15px;
    font-weight: 600;
}
.title{
    position: fixed;
    color: red;
    position: fixed;
    top: 0px;
    left: 2%;
}

img{
    width: 150px;
    position: fixed;
    top: 2%;
}

h1{
    font-weight: 800;

}

svg{
    width: 50px;
    height: 50px;
    transition: all .3s ease-in-out;
}
svg:hover{
    
}
/* SEARCH */
.search-container{
    display: inline-block;
    position: fixed;
    top: 9px;
    left: 45%;
}
.search-container .search-box{
    position: fixed;
    top: 25px;
    right: 10%;
    background-color: #000;
    box-shadow: none;
    display: none;
    padding-left: 30px;
    font-size: 16px;
    border: 1px solid transparent;
    border-radius: 3px;
    outline: none;
    width: 0px;
    height: 30px;
    color: white;
    transition: all .5s ease-in;
}
.search-container .searchToggle{
    display: block;
    width: 160px;
    border-color: #fff;
}
.search-icon{
    position: fixed;
    height: 25px;
    right: 10%;
    top: 29px;
    z-index: 5;
    transition: all .3s ease-in-out;
}

.search-container .searchIconToggle{
    transform: translateX(-310%);
}
/* Sign out */
.signout-container{
position: fixed;
right: 2%;
top: 25px;
font-size: 15px !important;

}
/* Reset */

.reset-container{
    position: fixed;
    left: 55%;
    top: 25px;
}
/* Filter btn */
.filter-btn{
    position: fixed;
    top: 25px;
    left: 15%;
    font-size: 15px;
}
.filter-btn:hover, .signout-container:hover, .reset-container:hover{
    scale: 1.1;
    transition: all .3s ease-in-out;
}
.filter-container .filterToggle{
    display: flex !important;
    opacity: 1 !important;
    transition: all .3s ease-in;

}
.filter-container .filter-list{
    position: fixed;
    top: 64px;
    left: 12.5%;
    display: none;
    list-style: none;
    color:white;
    background: rgb(24, 24, 24);
    justify-content: center;
    opacity: 0;

    transition: all .3s ease-in;
}
li{
    padding: 10px;
    margin: 10px;
}
input[type="checkbox"]{
    appearance: none;
    
    display: grid;
    place-content: center;
    width: 1.15em;
    height: 1.15em;
    border: 0.20em solid white;
    border-radius: 0.25em;
    cursor: pointer;
}
input[type="checkbox"]::before {
  content: "";
  width: 0.75em;
  height: 0.75em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 2em 2em red;
  border-radius: 0.15em;

}
input[type="checkbox"]:checked::before {
  transform: scale(1.09);
}
label{
}


button {
    font-family: 'Rubbik', Arial;
}
</style>