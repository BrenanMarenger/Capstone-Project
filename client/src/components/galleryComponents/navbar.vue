<template>
    <div>
        <!--Searching-->
        <input type="text" placeholder="Search by title..." v-model="navSearch" @keydown.enter="sendSearch"> 
        <button @click="sendSearch">Search</button>
        <!--Filtering-->
        <ul> 
            <li>
                <button class="filter-btn">Filter</button>
                <ul>
                    <li>
                        <button class="year-btn">By Year</button>
                        <ul>
                            <div v-for="year in yearList" :key="year"> 
                                <input type="checkbox" @click="toggleYearFilter(year)"> {{ year }}
                            </div>
                            
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <!--
            <li>
                        <button class="category-btn">By Category</button>
                        <ul>
                            <li v-for="category in categoryList" :key="category">
                                <input type="checkbox" checked> {{ category }}
                            </li>
                        </ul>
                    </li>
        -->
        
        <button>Tree</button>
        <button v-if="$store.state.isLoggedIn" @click="logout">Sign out</button>
    </div> 
    
</template>

<script>
export default {
    name: 'Navbar',
    props: ['categoryList', 'yearList'],
    data(){
        return {
            navSearch: '',
        }
    },
    methods:{
        sendSearch(){
            this.$emit('recieveSearch', this.navSearch)
        },
        toggleYearFilter(year){
            this.$emit('toggleYearFilter', year)
        },
        logout(){
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'start'
            })
        }
    }

}
</script>

<style>


</style>