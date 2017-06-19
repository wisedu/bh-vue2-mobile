import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Mint from 'bh-mint-ui2';
import route from './router';
import init from 'bh-mixin-sdk'
import 'bh-mint-ui2/lib/style.css'

Vue.use(Mint);
Vue.use(VueRouter);
const router = new VueRouter(route);

global.SDK = null;

function getSDKConfig () {
    return new Promise((resolve, reject) => {
        let config = {
            wx: {
                uploadImgsToEmapUrl: WEBPACK_CONIFG_HOST + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do' //TODO: 上传接口
            }, //微信jdk初始化参数
            dd: {}, //钉钉jdk初始化参数
        }
        if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
            //   config.wx.url = WEBPACK_CONIFG_HOST + '/sys/yxapp/WechatServiceStu/getWechatSign.do' //TODO: 微信签名服务
            config.wx.url = "http://res.wisedu.com:8888/checkSign";
            getWechatSign(window.location.href.replace(/#(\S+)?/, '')).then(({data: resp}) => {
                if (resp.status == 200) {
                    let signData = resp.datas
                    signData.corpId = signData.corpid
                    signData.nonceStr = signData.noncestr
                    config.wx.signData = signData
                    resolve(config)
                } else {
                    ons.notification.alert('微信jsdk初始化失败')
                    reject(resp)
                }
            }, () => {
                ons.notification.alert('微信jsdk初始化失败')
                reject()
            })
        } else {
            setTimeout(function() {
                resolve(config)
            }, 0)
        }

        return config
    })
}

getSDKConfig().then((config) => {
    init((res) => {
        if (res.type === 'success') {
            global.SDK = res.sdk;

            new Vue({
                el: '#app',
                router,
                template: '<App/>',
                components: {App}
            });
        }
    }, config)
})
