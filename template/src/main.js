import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Mint from 'bh-mint-ui2';
import VueResource from 'vue-resource';
import route from './router';
import SDK, {
    init
} from 'bh-mobile-sdk';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.credentials = true;
const router = new VueRouter(route);
let Init = () => {
    new Vue({
            el: '#app',
            router: router,
            render: h => h(App)
    });
}

init(() => {
    var sdk = SDK();
    if(sdk.UI && sdk.UI.toggleNavBar) {
        sdk.UI.toggleNavBar(false);
    }
    Init()
})
