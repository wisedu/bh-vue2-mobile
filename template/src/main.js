import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Mint from 'bh-mint-ui2';
import { Toast } from 'bh-mint-ui2';
import route from './router';
import * as utils from './utils'
import api from './api'
import axios from 'axios'
import 'bh-mint-ui2/lib/style.css'
{{#useNativeSDK}}
import init from 'bh-mixin-sdk'
{{/useNativeSDK}}

if (window.smile) {
  window.Vue = Vue
  window.axios = axios
  if (WEBPACK_CONFIG_HOST) {
      window.WEBPACK_CONFIG_HOST = WEBPACK_CONFIG_HOST
  }
  // 初始化eventBus
  window.smile.eventBus = new Vue()
}

Vue.use(Mint);
Vue.use(VueRouter);
const router = new VueRouter(route);

router.beforeEach((to, from, next) => {
  // 加载页面smile依赖
  if (window.smile) {
      var require = []
      var promiseArr = []
      // 拉取require配置中的表单
      if (to.meta.require && to.meta.require.length > 0) {
          require = require.concat(to.meta.require)
      }
      // 拉取传参中的表单
      if (to.query.smileForm) {
          require.push(to.query.smileForm)
      }
      require.map(function(item) {
          if (!window.smile.components[item]) {
              promiseArr.push(window.smile.loadPage(item))
          }
      })
      if (promiseArr.length > 0) {
          Promise.all(promiseArr).then(function() {
              next()
          })
      } else {
          next()
      }
  } else {
      next()
  }
})

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
        uploadImgsToEmapUrl: WEBPACK_CONFIG_HOST + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do' //TODO: 上传接口
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
  init((res) => {
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
