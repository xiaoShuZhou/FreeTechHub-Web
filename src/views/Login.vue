<template>
    <div id="Login">
        <Navbar/>
        <div><span>name: <input type="text" v-model="username"/></span></div>
        <div><span>password: <input type="password" v-model="password"/></span></div>
        <button @click="login">Login</button>
        <button @click="logout">Logout</button>
        <router-link to="/register">register</router-link>
        <button @click="showSelf">Show Self</button>
    </div>
</template>

<script>
// import Navbar from '@/components/Utils/Navbar'
// import Blog from '@/assets/js/Blog'
import {login, logout} from '@/assets/utils/auth'
import axios from 'axios'

export default {
    name: "Login",
    components: {

    },
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login: async function() { 
            try{
                await login(this.username, this.password)
            } catch(err) {
                alert('Wrong passowrd or username!')
            }
        },
        logout: function() { logout() },
        showSelf() {
            axios.get('http://127.0.0.1:8000/user/getself/')
            .then(self => console.log(self))
        }
    }
}
</script>

<style scoped>

</style>
