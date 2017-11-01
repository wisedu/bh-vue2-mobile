# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

```
{{ name }}/
│
├── build/                              打包脚本
│   └── ...        
├── mock/                               本地mock数据存放位置，不会被打包
│   └── data1.json                      访问示例：http://0.0.0.0:8080/mock/data1.json
├── src/                                源码
│   ├── components/                     项目内可复用的组件
│   │   ├── com1/
│   │   │   ├── com1.vue
│   │   │   └── ···
│   │   ├── com2/
│   │   │   ├── com2.vue
│   │   │   └── ···
│   │   └── ···/
│   ├── pages/      
│   │   ├── modules1/
│   │   │   ├── modules1.vue
│   │   │   ├── modules1.scss
│   │   │   └── ···
│   │   ├── modules2/
│   │   │   ├── modules2.scss
│   │   │   ├── modules2.vue
│   │   │   └── ···
│   │   └── ···/
│   └── vuex/                           状态控制，仅适合较复杂的业务场景
│       ├── actions.js
│       └── ···
├── static/                             静态资源文件，引用方式：
│   ├── assets/
│   ├── css/
│   │   ├── base.css
│   │   └── style.css
│   └── js/
│  
├── config.js
└── index.html
```