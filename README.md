# webpack-simple

``` bash
$ npm install -g vue-cli
$ vue init wisedu/bh-vue2-mobile ${your_project}
$ cd my-project
$ npm install
$ npm run dev
```

在webpack.config.js中定义了变量：

在开发时需要调用接口，其上下文路径请使用以下环境变量，如：
  let prefix = WEBPACK_CONIFG_HOST;
  config.url = prefix + config.url;

开发环境时
"WEBPACK_CONIFG_HOST":'"http://amptest.wisedu.com/xsfwfw/"'

发布环境时
"WEBPACK_CONIFG_HOST":'location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"'

