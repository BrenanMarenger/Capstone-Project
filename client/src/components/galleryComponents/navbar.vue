<template>
    <div class="body">
        <!-- Welcome -->
        <div> 
            <h1 class="title"> RetroFlix </h1>
        </div>
        
        <!--Filtering-->
        <div class="filter-container"> 
            <button class="filter-btn" @click="showFilters">Filter</button>
            <ul class="filter-list">
                <div v-for="year in yearList" :key="year">
                    <li>
                        <input type="checkbox" class="filter-item" @click="toggleYearFilter(year)"> {{ year }}
                    </li>
                </div>
            </ul>
        </div>
        
        <!--Searching-->
        <div class="search-container"> 
            <svg 
            id="searchIcon" 
            @click="openSearch" 
            class="search-icon" 
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
           
            <input 
            id="searchBox"
            class="search-box" type="text" placeholder="Search by title..." 
            v-model="navSearch" 
            @keydown.enter="sendSearch"
            >
        </div>
        <!-- Reset filters -->
        <button @click="sendResetFilters" v-if="filteredYears.length > 0 || search!=''" >Clear</button> <!--ONLY SHOW WHEN SEARCH OR FILTERING v-if="hasFilters"-->
        
        <!-- Sign out -->
        <button v-if="$store.state.isLoggedIn" @click="logout">Sign out</button>
    </div>

</template>

<script>
export default {
    name: 'Navbar',
    props: ['categoryList', 'yearList', 'filteredYears', 'search'],
    data() {
        return {
            navSearch: '',
            currentUser: ''
        }
    },
    mounted(){
        this.currentUser = this.$store.state.user.id

    },
    methods: {
        openSearch(){
           
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

        },
        sendResetFilters(){
            document.querySelectorAll('input[type="checkbox"]')
            .forEach(el => el.checked = false);
            this.navSearch = ''
            
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
    height: 30px;
    left: 0;
    justify-content: space-between;
    background: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5));

}
button{
    height: 30px;
    cursor: pointer;
    background: none;
    color: white;
    border: none;
    font-size: 20px;
    font-weight: 600;
}
.title{
    color: red;
    position: fixed;
    top: 0px;
    left: 50px;
}

svg{
    width: 50px;
    height: 50px;
    transition: all .3s ease-in-out;
}
svg:hover{
    scale: 1.05;
}
/* SEARCH */
.search-container{
    display: inline-block;
    position: fixed;
    top: 9px;
    right: 500px;
}
.search-box{
    position: fixed;
    top: 20px;
    right: 350px;
    width: 120px;
    transition: all .3s ease-in-out;
}
.search-icon{
    z-index: 5;
    transition: all .3s ease-in-out;
    /* transform: translate(-200px); */
    /* on click translate left 200px */
}
/* Filter btn */
.filter-btn{
    position: fixed;
    top: 25px;
    left: 300px;
}
.filter-btn:hover{
    text-decoration: underline;

}
.filter-btn:hover .filter-list{
    display: block;
}
.filter-list{
    list-style: none;
    display: flex;
    color:white;
    background: grey;
    margin-top: 53px;
    justify-content: center;
}
li{
    padding: 10px;
    margin: 10px;
}


button {
    font-family: 'Rubbik', Arial;
}
</style>