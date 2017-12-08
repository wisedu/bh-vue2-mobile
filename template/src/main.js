import App from './App.vue';
import route from './router';
import * as utils from './utils'
import api from './api'

let Vue = window.Vue;
let VueRouter = window.VueRouter;
let axios = axios;
let Toast = window.$toast;
let Indicator = Vue.$indicator;
let MessageBox = Vue.$messagebox;

if (WEBPACK_CONIFG_HOST) {
    window.WEBPACK_CONIFG_HOST = WEBPACK_CONIFG_HOST
}

const router = new VueRouter(route);

{{#useNativeSDK}}
global.SDK = null;

function getSDKConfig() {
  return new Promise((resolve, reject) => {
    let config = {
      // 微信sdk初始化参数
      wx: {
        /**
         * 微信端上传图片的流程是：
         * 1、选取文件通过微信jsdk上传到微信服务器后获取文件的serverId
         * 2、将serverId发送到应用服务端，服务端接收请求后根据serverId，将文件从微信服务拉取到应用服务
         * 
         * uploadImgsToEmapUrl 参数 就是步骤2中 将serverId发送到应用服务的请求接口
         */
        // TODO: 上传接口
        uploadImgsToEmapUrl: WEBPACK_CONIFG_HOST + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do' //TODO: 上传接口
      },
      dd: {}, //钉钉jdk初始化参数
    }
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      /**
       * 判断运行环境为微信时，向后端发送请求获取微信jsdk的授权签名，（此接口应该有后端来提供），请求返回应包含以下参数
       * corpId - 企业号的corpid
       * nonceStr - 生成签名的随机串
       * timestamp - 生成签名的时间戳
       * signature - 签名
       */
      // TODO: 发请求获取微信签名
      config.wx.url = "http://res.wisedu.com:9090/checkSign";
      utils.Get(api.getWechatSign, { configurl: window.location.href.replace(/#(\S+)?/, '') }).then(({
        data: resp
      }) => {
        if (resp.code == "0") {
          let signData = resp.data
          signData.corpId = signData.corpid
          signData.nonceStr = signData.noncestr
          config.wx.signData = signData
          resolve(config)
        } else {
          Toast('微信jsdk初始化失败 ' + resp.code);
          reject(resp)
        }
      }, () => {
        Toast('微信jsdk初始化失败');
        reject()
      })
    } else {
      setTimeout(function () {
        resolve(config)
      }, 0)
    }
    return config
  })
}

getSDKConfig().then((config) => {
  BH_MOBILE.default((res) => {
    if (res.type === 'success') {
      global.SDK = res.sdk;

      new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: {
          App
        }
      });
    }
  }, config)
})
{{/useNativeSDK}}
{{^useNativeSDK}}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
{{/useNativeSDK}}
