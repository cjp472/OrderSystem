const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

const dateFormat = (date, formatStr) => {
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
};

export function isEmptyValue(value) {
  return value === undefined || value === null || value === '';
}

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return '请输入有效邮箱账号';
  }
}

// 确定长度
export function length(len) {
  return value => {
    if (!isEmpty(value) && value.length !== len) {
      return `长度必须是 ${len} 位`;
    }
  };
}

export function username(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[a-zA-Z0-9_\u4e00-\u9fa5@\.]+$/ui.test(value)) {
    return '只能输入中文,字母,数字,下划线,.,@和横线';
  }
}

export function required(message) {
  return value => {
    if (isEmpty(value)) {
      return message || '必填选项，请输入内容!';
    }
  };
}

export function telephone(value) {
  if (!isEmpty(value) && !/^1\d{10}$/i.test(value)) {
    return '请输入11位有效手机号码';
  }
}

export function telephoneOrMail(value) {
  if (!isEmpty(value) && !/^1\d{10}$/i.test(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return '请输入效邮箱或手机号码';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `长度至少 ${min} 位`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `长度最多 ${max} 位`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return '请输入有效数字';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return '密码不一致';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function dateValidate(date) {
  const currentDate = dateFormat(new Date(), 'yyyy-MM-dd');
  if (date >= currentDate) {
    return true;
  }
  return false;
}
