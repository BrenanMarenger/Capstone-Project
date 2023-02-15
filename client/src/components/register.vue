<template>
    <!--
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Register</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                prepend-icon="person"
                                name="email"
                                label="Email"
                                v-model="email"
                                ></v-text-field>
                                <v-text-field
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                type="password"
                                v-model="password"
                                ></v-text-field>
                                <v-text-field
                                name="confirmPassword"
                                label="Confirm Password"
                                v-model="confirmPassword"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="register">
                            Register
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
    -->
    <div> 
        <h1>Register</h1>
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
.error{
    color: red
}

</style>