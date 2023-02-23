<template>
    <div class="body"> 
        <div class="register"> 
            <div class="title">Register</div>
            
            <label for="email">Email</label>
            <input name="email" v-model="email" placeholder="example@gmail.com"/>
            
            <label for="password">Password</label>
            <input name="password" v-model="password" type="password"/>
            
            <label for="confirmPassword">Confirm Password</label>
            <input name="confirmPassword" v-model="confirmPassword" type="password"/>
            <p class="error">
                {{ err }}
            </p>
            <button class="submit-btn" @click="register">Register</button>
            <br>
            <div class="login-link"> 
                <router-link to="login">
                    Have an accout? Log In
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
            confirmPassword: '',
            err: null
        }
    },
    methods: {
        async register(){
            if(this.confirmPassword == this.password){
                this.err = ""
                try{
                const response = await AuthenticationService.register({
                email: this.email,
                password: this.password
                })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({name: 'gallery'})
                } catch (err) {
                this.err = err.response.data.error
                }
            } else {
                this.err = "Password and Confirm Password don't match"
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

.register{
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

.login-link{
    margin: 5px;
    color: grey;
    font-size: 0.9rem;
}

.error{
    color: red;
}
</style>