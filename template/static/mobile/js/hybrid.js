var Hybrid = (function() {
  var addDependencies = function(callback) {
    var loadFlag = {cordovaJs: false, webViewJs: false, publicJs: false, jquery: false};
    var cordovaJs = document.createElement('script');
    cordovaJs.setAttribute('src', '../../plugin.apis/cordova.js');
    var webViewJs = document.createElement('script');
    webViewJs.setAttribute('src', '../../plugin.apis/webView.js');
    var publicJs = document.createElement('script');
    publicJs.setAttribute('src', '../../common/js/public.js');
    var jquery = document.createElement('script');
    jquery.setAttribute('src', '../../common/fe_components/jquery-1.11.3.js');
    document.head.appendChild(jquery);
    document.head.appendChild(cordovaJs);
    document.head.appendChild(webViewJs);
    document.head.appendChild(publicJs);
    var _check = function() {
      if (loadFlag.cordovaJs && loadFlag.webViewJs && loadFlag.publicJs && loadFlag.jquery) {
        callback && callback();
      }
    };
    cordovaJs.onload = function() {
      loadFlag.cordovaJs = true;
      _check();
    };
    webViewJs.onload = function() {
      loadFlag.webViewJs = true;
      _check();
    };
    publicJs.onload = function() {
      loadFlag.publicJs = true;
      _check();
    };
    jquery.onload = function() {
      loadFlag.jquery = true;
      _check();
    };
  };
  return {
    Init: function(callback) {
      window.loadPage = function() {
        callback && callback();
      };
      addDependencies(function() {
        TrunPage.pageInit();
      });
    }
  }
}())
