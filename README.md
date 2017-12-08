# webpack-simple

``` bash
$ npm install -g vue-cli
$ vue init wisedu/bh-vue2-mobile#2.0 ${your_project}
$ cd my-project
$ npm install
$ npm run dev
```

Vue / VueRouter / axios / BH-Mint-UI 2已经通过 script方式引入

在webpack.config.js中定义了变量：

在开发时需要调用接口，其上下文路径请使用  WEBPACK_CONIFG_HOST  环境变量，如：
``` js

CommonRequest('sys/leaveSchool/MobileAuth/setDefaultRole.do');

function CommonRequest(url, config = {}) {
  return axios({
    method: config.method || 'get',
    url: WEBPACK_CONIFG_HOST + url,
    params: config.params || null,
    data: config.data || null,
    adapter: config.mockFlag ? () => MOCK_DATA[config.mock] : null
});

```

1. 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
1. 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
