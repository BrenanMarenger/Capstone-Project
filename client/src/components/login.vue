<template>
    <div> 
        <h1>Login</h1>
        <br>
        <input name="email" v-model="email" placeholder="example@gmail.com"/>
        <br>
        <input name="password" v-model="password" type="password"/>
        <br>
        <p class="error">
            {{ err }}
        </p>
        <button @click="login">Login</button>
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

                } catch (err) {
                    this.err = err.response.data.error
                }
        }
    }
}

</script>
