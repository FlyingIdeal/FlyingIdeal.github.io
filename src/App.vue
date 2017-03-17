<template>
    <div id="app">
        <HeadNav></HeadNav>
        <router-view></router-view>
        <Foot></Foot>
    </div>
</template>

<script>

import HeadNav from './components/Nav.vue'
import Foot from './components/Foot.vue'
import Home from './components/Home.vue'


export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components : {
        'HeadNav' : HeadNav,
        'Foot' : Foot,
        'Home' : Home
    }
}
</script>

<style>
    @import url(./assets/css/basic.css);
    @import url(./assets/css/style.css);
</style>
