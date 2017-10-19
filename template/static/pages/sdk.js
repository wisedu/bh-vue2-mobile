;
(function (smile) {
  /**
   * 同步数据到store
   * @param {*} componentId - 需要同步数据的组件的smile-guid,从组件根节点的smile-guid上获取
   * @param {*} key - 需要同步的属性的key。默认是value
   */
  smile.syncData = function (componentId, key) {
    key = key || 'value'
    smile.eventBus.$emit('sync-data', {
      componentId: componentId,
      key: key
    })
  }

  /**
   * post 请求封装
   * @param {String} url - 请求地址
   * @param {Object} data - 请求参数，JSON对象
   */
  smile.post = function (url, data, config) {
    config = config || {}
    return new Promise(function(resolve, reject) {
      axios.post(url, serializeData(data), config).then(function(resp) {
        resolve(resp.data)
      }, function(error) {
        reject(error)
      })
    })
  }

  /**
   * get 请求封装
   * @param {String} url - 请求地址
   * @param {Object} data - 请求参数，JSON对象
   */
  smile.get = function (url, data, config) {
    config = config || {}
    var data = serializeData(data)
    if (data) {
      url += '?' + data
    }
    return new Promise(function(resolve, reject) {
      axios.get(url, config).then(function(resp) {
        resolve(resp.data)
      }, function(error) {
        reject(error)
      })
    })
  }

  /**
   * 加载页面模块
   * @param {String} pageName - 页面名称
   * @return {Promise} 
   */
  smile.loadPage = function (pageName) {
    var url = './public/doc_resource/' + pageName + '/' + pageName + '.js'
    var eventMapUrl = './public/doc_resource/' + pageName + '/eventMap.js'
    var pageLoad = new Promise(function (resolve, reject) {
      loadScript(url).then(function() {
        initPage(pageName)
        resolve()
      })
    })
    return Promise.all([pageLoad, loadScript(eventMapUrl)])
  }

  smile.DataSourceFactory = {
    create: function(meta, params){
        function deepFreeze(obj) {
            var propNames = Object.getOwnPropertyNames(obj);
            propNames.forEach(function(name) {
                var prop = obj[name];
                if (typeof prop == 'object' && prop !== null)
                    deepFreeze(prop);
            });
            return Object.freeze(obj);
        }

        var ds;
        eval("ds = new " + meta.adapter + "(meta.meta)");
        ds.actions = meta.actions;
        // Object.defineProperty(ds, 'meta', {
        //     enumerable: false,
        //     configurable: false,
        //     writable: false
        // });
        // deepFreeze(ds);
        return ds;
    },
    createOnline: function(adapter, params){
      var ds;
      eval("ds = new " + adapter + "()");
      ds.events = params.events;
      return ds.load(params.url, params.modelname);
    }
}

  /**
   * 异步加载js
   * @param {*} url 
   */
  function loadScript (url) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.setAttribute('src', url)
      script.onload = function (e) {
        resolve(e)
      }
      script.onerror = function (e) {
        reject(e)
      }
      document.querySelector('body').appendChild(script)
    })
  }

  /**
   * 初始化页面为vue component
   * @param {String} pageName - 页面名称
   */
  function initPage (pageName) {
    Vue.component(pageName, smile.components[pageName])
    // 初始化组件样式
    if (smile.components[pageName].style) {
      var style = document.createElement('style')
      style.setAttribute('simle-component-name', pageName)
      style.innerHTML = smile.components[pageName].style
      document.querySelector('head').appendChild(style)
    }
  }

  /**
   * 序列化请求参数
   * @param {*} data 
   */
  function serializeData(data) {
    if (!data) return ''
    var dataArr = []
    for (var k in data) {
      if (data[k] === undefined) continue
      if (typeof data[k] === 'boolean') {
        dataArr.push(k + '=' + ~~data[k])
      } else {
        dataArr.push(k + '=' + data[k])
      }
    }
    return dataArr.join('&')
  }
})(window.smile = window.smile || {})