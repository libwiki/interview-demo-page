import designConfig from '../../design.config';


export function px2rem(variable, unit = 'rem') {
    return designConfig.pxToRem(variable, unit)
}

export function twRem2Rem(variable, unit = 'rem') {
    return designConfig.twRemToRem(variable, unit)
}

export function canSetParams(method = 'get') {
    return ['get', 'delete', 'head'].includes(method.toLowerCase())
}




export function isPhone(value) {
    return /^1\d{10}$/.test(value);
}

// 判断是否为null
export function isNull(value) {
    return toString.call(value) === '[object Null]' || value === 'null';
}

export function isNotEmpty(value) {
    return !isEmpty(value)
}

// 判断数据是否为空
export function isEmpty(value) {
    if (isUndefined(value) || isNull(value)) {
        return true;
    }
    if (isString(value) && value.trim(value).length === 0) {
        return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    }
    if (isObject(value) && Object.values(value).length === 0 && !(value instanceof Date)) {
        return true;
    }
    if (isObject(value) && value instanceof Date && !value) {
        return true;
    }
    return false;
}

// 对象的深拷贝
export function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}

// 是否为一个对象 例如：{...} 返回true  其它均为false
export function isObject(value) {
    return toString.call(value) === '[object Object]';
}

// 是否是数组
export function isArray(value) {
    return toString.call(value) === '[object Array]';
}

// 是否为字符串
export function isString(value) {
    return typeof value === 'string';
}

// 是否是undefined
export function isUndefined(value) {
    return typeof value === 'undefined' || value === 'undefined';
}

export function isFalse(value) {
    return !isTrue(value)
}

// 是否为true  0、'0'、false、'false'、为false
export function isTrue(value) {
    if (isBoolean(value)) {
        return value;
    } else if (isNull(value)) {
        return false;
    } else if (isNumeric(value)) {
        return value != 0;
    } else if (isString(value)) {
        return value === 'true';
    }

    return false;
}

// 是否是布尔值
export function isBoolean(value) {
    return typeof value === 'boolean';
}

// 是否是一个函数
export function isFunction(value) {
    return typeof value === 'function';
}

// 是否是number  '123' 是字符串  使用该方法返回false
export function isNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}

// 是否是number 或者 字符串形式的number  123、'123'均返回true
export function isNumeric(value) {
    return isNumber(Number(value));
}

// 是否是一个整数
export function isInteger(value, isStrict = true) {
    if (isStrict) {
        return Number.isInteger(value);
    }
    return Number.isInteger(Number(value));
}
