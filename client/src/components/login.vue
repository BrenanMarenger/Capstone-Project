<template>
    <div class="body"> 
        <div class="login">
            <div class="title">Login</div>
            
            <label for="email">Email</label>
            <input class="email" name="email" v-model="email" required="true"/>
                
            <label for="password">Password</label>
            <input name="password" v-model="password" type="password" required="true" />
            <p class="error">
                {{ err }}
            </p>
            <button  class="submit-btn" @click="login">Login</button>
            
            <div class="register-link"> 
                <router-link to="register">
                Dont have an account? Register
            </router-link>
            </div>
            
        </div>
    </div>
    
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data () {
        return {
            email: '',
            password: '',
            err: null
        }
    },
    methods: {
        async login(){
                try{
                    const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                })
                    this.$store.dispatch('setToken', response.data.token)
                    this.$store.dispatch('setUser', response.data.user)
                    this.$router.push({name: 'gallery'})

                } catch (err) {
                    this.err = err.response.data.error
                }
        }
    }
}

</script>

<style scoped>
.body{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: grey;
    overflow: hidden;
    font-family: 'Rubbik', sans-serif;

}

.login{
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.75);
    border-radius: 4px;
    padding: 60px 68px 40px;
    height: 50%;
    width: 15%;

}

label{
    margin:5px;
    color:grey;
}


.title{
    color: white;
    font-size: 2.2rem;
    margin: 10px;
}
input{
    width: 100%;
    position: relative;
    background: #333;
    margin-bottom: 5px;
    border-radius: 4px;
    border: none;
    opacity: 1;
    font-size: 1rem;
    color:white;
    line-height: 35px;
    

}

.submit-btn{
    margin: 5px 0 5px;
    padding: 16px;
    color: white;
    background: red;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-link{
    margin: 5px;
    color: grey;
    font-size: 0.9rem;
}

.error{
    color: red;
}
</style>
