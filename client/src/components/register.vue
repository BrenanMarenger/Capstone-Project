<template>
    <div> 
        <h1 className="text-3xl font-bold underline">Register</h1>
        <br>
        <input name="email" v-model="email" placeholder="example@gmail.com"/>
        <br>
        <input name="password" v-model="password" type="password"/>
        <br>
        <input name="confirmPassword" v-model="confirmPassword" type="password"/>
        <p class="error">
            {{ err }}
        </p>
        <button @click="register">Register</button>
        <br>
        <router-link to="login">
        Have an accout? Log In
        </router-link>
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