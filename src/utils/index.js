export function isMobile1() {
  // 实现方法1
  // return ('ontouchstart' in document.documentElement);
  // 实现方法2
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}
export function isMobile2() {
  // 实现方法1
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

export function isMobile() {
  return isMobile1()
}

export function isWeiXin() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  }
  return false
}

export function isAndroid() {
  if (/(Android)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

export function isIOS() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

export function isEmail(email) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
}

export function isPhone(phoneNo) {
  return /([1][3,4,5,6,7,8,9])\d{9}/.test(phoneNo)
}

// 验证是否为http
export function isHttp() {
  if (window.location.protocol === 'http:') {
    return true
  }
  return false
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 字符串首尾去空格
export function toTrim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

export function toBoolean(val) {
  switch (val) {
    case 'true':
    case 1:
    case 'yes':
      return true
    case 'false':
    case 0:
    case 'no':
    case undefined:
    case null:
    case '':
      return false
    default:
      return Boolean(val)
  }
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
