import { loginInfo } from './WqJsBridge';

export function dateFormat(date, formatStr) {
  let fmt = formatStr;
  const obj = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)));
    }
  }
  return fmt;
}

/**
 * 生成UUID
 */
export function generateUUID() {
  let time = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (value) => {
    const random = (time + Math.random() * 16) % 16 | 0;
    time = Math.floor(time / 16);
    return (value === 'x' ? random : ( random & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}


export function getImageUrl(cb) {
  let imgUrl = '';
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
    try {
      loginInfo((info) => {
        imgUrl = info.image_url || '';
        if (cb) cb(imgUrl);
      });
    } catch (error) {
      console.log(error);
    }
  } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
    document.addEventListener(
      'WebViewJavascriptBridgeReady', () => {
        try {
          loginInfo((info) => {
            imgUrl = info.image_url || '';
            console.log(imgUrl);
            if (cb) cb(imgUrl);
          });
        } catch (error) {
          console.log(error);
        }
      }, false);
  }
}

/**
  * 获取图片的路径(半路经)
  * val : 前缀
  * url: 图片路径
  */
export function judgeImgUrl(val, url) {
  if (!val) return url;
  const _len = val.length;
  if (parseInt(url.substr(0, _len), 10) === val) {
    return url;
  }
  if (url.substr(0, _len) === '/') {
    return val + url;
  }
  return val + '/' + url;
}
