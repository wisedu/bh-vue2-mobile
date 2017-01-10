import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import route from './router';
Vue.use(VueRouter);
const router = new VueRouter(route);
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});