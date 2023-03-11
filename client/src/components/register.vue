<template>
    <div class="body"> 
        <div class="logo"> 
            <img src="https://d3dg8a58k5opnp.cloudfront.net/logo.png">
        </div>
        <div class="register"> 
            <h1>Register</h1>
            <form>
                <div class="text">
                    <input name="email" v-model="email" required="true"/>
                    <span></span>
                    <label for="email">Email</label>
                </div>
                <div class="text">
                    <input name="password" v-model="password" type="password" required="true"/>
                    <span></span>
                    <label for="password">Password</label>
                </div>
                <div class="text">
                    <input name="confirmPassword" v-model="confirmPassword" type="password" required="true"/>
                    <span></span>
                    <label for="confirmPassword">Confirm Password</label>
                </div>
            </form>
            
            <button class="submit-btn" @click="register">Register</button>
            <span class="error">
                {{ err }}
            </span>
            
            <div class="login-link"> 
                <router-link style="text-decoration: none; color: inherit;" to="login">
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
    background: linear-gradient(120deg, rgb(34, 34, 34),darkgrey);
    overflow: hidden;
    font-family: 'Rubbik', sans-serif;

}

.logo{
    position: absolute;
    top: 3%;
    left: 1%;
}

img{
    width: 200px;
}

.register{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.65);
    border-radius: 6px;
    padding: 60px 68px 40px;
    height: 525px;
    width: 400px;
}

.register h1{
text-align: center;
padding: 0 0 20px 0;
border-bottom: 1px solid silver;
color: white;
font-size: 2.3rem;
margin: 15px;
}

.register form{
    padding: 0 40px;
    box-sizing: border-box;
}
form .text{
    position: relative;
    border-bottom: 2px solid white;
    margin: 39px 0;
}
.text input{
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    color:white;
    border: none;
    background: none;
    outline: none;
}

.text label{
    position: absolute;
    top: 50%;
    left: 5px;
    color: grey;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: .5s;
}

.text span::before{
    content: '';
    position: absolute;
    top: 40px;
    left: 0px;
    width: 0%;
    height: 2px;
    background: rgb(255, 70, 70);
    transition: .5s;
}

.text input:focus ~ label,
.text input:valid ~ label{
    font-size: 13px;
    top: -6px;
    color: rgb(255, 70, 70);
}

.text input:focus ~ span::before,
.text input:valid ~ span::before{
    width: 100%;
}

.submit-btn{
    height: 50px;
    margin: 5px 0 5px;
    padding: 16px;
    color: white;
    background: red;
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
}

.submit-btn:hover {
    background: rgb(221, 0, 0);
    transition: .2s;
    scale: 1.01;

}

.login-link{
    margin: 30px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    color: grey;
}
.login-link:hover{
    text-decoration: underline;
}

.error{
    color: red;
}
</style>