const registerEvents = ['getGoodsByApp', 'getCartGoodsByApp', 'onBackPress'];

export default new class WqJsBridge {
  constructor() {
    this.registerHandler(registerEvents);
  }
  /* 公共方法，通过桥接调用原生方法公共入口 */
  invoke = (name, param, callback) => {
    console.log(name, param, callback);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      this.setup(function(bridge) {
        bridge.callHandler(name, param, function(response) {
          callback && callback.call(this, response)
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      /* eslint-disable */
      window.WebViewJavascriptBridge.callHandler(name, param && JSON.stringify(param), function (response) {
        callback && callback.call(this, response && eval('(' + response + ')'))
      })
      /* eslint-enable */
    }
  }
  setup = (callback) => {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    /* eslint-enable */
  }

  /**
   * 注册事件
   */
  registerHandler = (events) => {
    if (typeof window !== 'undefined') {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
        /* eslint-disable */
        this.setup(function(bridge) {
          events.forEach((eventName) => {
            bridge.registerHandler(eventName, () => {
                const event = new CustomEvent(eventName);
                // 分发事件
                window.dispatchEvent(event);
            })
          });
        })
        /* eslint-enable */
      } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
        // 注册分类页面事件
        if (window.WebViewJavascriptBridge) {
          events.forEach((eventName) => {
            window.WebViewJavascriptBridge.registerHandler(eventName, () => {
              const event = new CustomEvent(eventName);
              // 分发事件
              window.dispatchEvent(event);
            });
          });
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady', () => {
              events.forEach((eventName) => {
                window.WebViewJavascriptBridge.registerHandler(eventName, () => {
                  const event = new CustomEvent(eventName);
                  // 分发事件
                  window.dispatchEvent(event);
                });
              });
            }, false);
        }
      }
    }
  }

  /*
  * 打开新的窗口
  * params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  * */
  openWindow = (params, callback) => {
    this.invoke('openWindow', params, callback);
  }
  /* 关闭当前窗 */
  closeWindow = (callback) => {
    this.invoke('closeWindow', null, callback);
  }
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode = (callback) => {
    this.invoke('scanQRCode', null, callback);
  }
  /*
   * 获取当前地理位置
   * type：坐标类型，订货365默认使用国测局'gcj02'
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度','country':'','province':'','city':'','area':'','street':''}
   * */
  getLocation = (callback) => {
    const self = this;
    setTimeout(() => {
      self.invoke('getLocation', 'gcj02', callback);
    }, 1000);
  }
  /*
  * 获取当前网络状态
  * 返回：{networkType:'返回网络类型2g，3g，4g，wifi'}
  * */
  getNetworkType = (callback) => {
    this.invoke('getNetworkType', null, callback);
  }
  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数'}
  * 返回选定照片的本地ID列表{localIds:[LocalResource://imageid123456789987654321]'}
  */
  chooseImage = (params, callback) => {
    this.invoke('chooseImage', params, callback);
  }
  /*
  * 上传图片
  * params：{uploadDir:'',localIds:['1', '2']}
  */
  uploadImage = (params) => {
    this.invoke('uploadImage', params);
  }
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
  * 备注：图片url后面带localId为标识为本地，客户端优先从本地查找，本地没有再从网络加载
  */
  previewImage = (params) => {
    this.invoke('previewImage', params);
  }

  /*
    * 监听/取消监听物理返回事件(仅android)
    * flag（true：监听，false：取消监听）
    */
  setBackEnable = (flag) => {
    if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      this.invoke('setBackEnable', flag);
    }
  }

  /*
  * 获取图片前缀
  * */
  getImagePrefix = () => {
    return 'LocalResource://imageid';
  }
  /*
  * 下载图片
  */
  downloadImage = () => {

  }
  /* 分享给朋友 */
  onMenuShareAppMessage = () => {

  }
  /* 分享到朋友圈 */
  onMenuShareTimeline = () => {

  }
  /* 退出到登陆页面 */
  logOut = () => {
    this.invoke('logOut');
  }
  /* 获取登陆信息 */
  loginInfo = (callback) => {
    this.invoke('getLoginInfo', null, callback);
  }
  /* 修改原生角标 */
  changeBadgeNum = (count) => {
    this.invoke('setBadgeNum', {key: count});
  }

  /** 隐藏下边栏 */
  hideTab = () => this.invoke('hideTab', null);

  /** 显示下边栏 */
  showTab = () => this.invoke('showTab', null);

  /** 去首页 */
  goHome = () => this.invoke('goHome', null);
}();
