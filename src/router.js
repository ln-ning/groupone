import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import index from './views/index/index.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'index',
            component: index
        }

    ]
})