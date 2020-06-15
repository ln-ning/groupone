import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//饿了么框架    
import ElementUI from 'element-ui';
//import '../node_modules/element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css';
//字体图标
import 'font-awesome/css/font-awesome.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')