const map = {
  string() {
    return ''
  },
  array() {
    return []
  }
}

const changeMap = {
  Radio: 1, CheckBox: 1, Select: 1, MultiSelect: 1
}
const customMap = {
  Tree: 1, Transfer: 1, Upload: 1
}
export default {
  getTypeObj(type) {
    return map[type]()
  },
  formatDate(date = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  },
  formatRules(list) {
    list = list.slice()
    list.forEach(v => {
      v.formItemConfig.base.rules = []
      const rules = v.formItemConfig.base.rules
      const configRules = v.formItemConfig.extra.configRules
      const message = v.formItemConfig.extra.failedMessage
      let trigger = 'blur'
      if(changeMap.hasOwnProperty(v.component)) {
        trigger = 'change'
      }else if(customMap.hasOwnProperty(v.component)) {
        trigger = 'none'
      }
      if(configRules.required) {
        rules.push({required: true, message, trigger})
      }
      if(configRules.min || configRules.max) {
        rules.push({min: +configRules.min, max: +configRules.max, message, trigger})
      }
      if(configRules.reg) {
        rules.push({
          validator(rule, value, callback) {
            if(!new RegExp(configRules.reg).test(value)) {
              callback(new Error(message))
            }else{
              callback()
            }
          },
          message,
          trigger
        })
      }
    })
    return list
  },
  formatFormData(list) {
    const res = {}
    list.forEach(v => { // 大部分都是返回value值,少数值是数组的特殊处理
      res[v.config.name] = map[v.config.valueType]()
    })
    return res
  },
  getRandomStr(len = 32) { // 随机字符串作为生成的控件name属性
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var maxPos = $chars.length
    var pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  checkClass(element, clazz) {
    let currentNode = element
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
      if (currentNode.classList.contains(clazz)) {
        return true
      }
      currentNode = currentNode.parentNode
    }
    return false
  }
}
