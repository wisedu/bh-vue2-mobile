import axios from 'axios'
import api from './api'

const UA = navigator.userAgent.toLowerCase()

function serialize(data) {
  if (!data) return '';
  var pairs = [], value;
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === 'function') continue;
    value = data[name].toString();
    name = encodeURI(name);
    value = encodeURI(value);
    pairs.push(name + '=' + value);
  }
  if (pairs.length) {
    return '?' + pairs.join('&');
  } else {
    return ''
  }
}

function getApi (name) {
  return api[name] || name
}

/**
 * @method Post
 * @description post请求
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 请求配置，详见axios文档 [https://github.com/mzabriskie/axios]
 */
export const Post = (url, data = null, config = {}) => {
  return axios({
      method: 'post',
      url: getApi(url),
      data: data,
      ...config
      // adapter: config.mockFlag ? () => MOCK_DATA[config.mock] : null
  })
}

/**
 * @method Get
 * @description get请求, 判断运行环境为今日校园时，使用原生壳子提供的get方法（此方法可以解决跨域问题）；若运行环境不是今日校园，则使用axios的get请求方法
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 运行环境是今日校园时，此参数为header参数；运行环境不是今日校园时，此参数为请求配置，详见axios文档 [https://github.com/mzabriskie/axios]；
 */
export const Get = (url, data = null, config = {}) => {
  if (/wisedu/.test(UA)) {
    // 今日校园 原生壳子 get方法
    let requestUrl = getApi(url) + serialize(data)
    return new Promise((resolve, reject) => {
      SDK.bh.http.sendGetRequest(requestUrl, (response) => {
        if (response.code !== 200) {
          reject(response)
        }
        resolve({
          data: JSON.parse(response.data)
        })
      }, config)
    })
  } else {
    return axios({
      method: 'get',
      url: getApi(url),
      params: data,
      ...config
    })
  }
}
