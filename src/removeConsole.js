/*
 * @Author: matiastang
 * @Date: 2021-10-12 15:14:26
 * @LastEditTime: 2021-10-12 17:49:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /matias-babel/src/removeConsole.js
 */
const get = require('lodash/get')
const eq = require('lodash/eq')

/**
 * 类型
 */
const _CONSOLE_ENUM = {
    /**
     * time
     * timeEnd
     */
    TIME: 'time',
    /**
     * group
     * groupCollapsed
     * groupEnd
     */
    GROUP: 'group',
    /**
     * assert
     */
    ASSERT: 'assert',
    /**
     * count
     */
    COUNT: 'count',
    /**
     * error
     */
    ERROR: 'error',
    /**
     * info
     */
    INFO: 'info',
    /**
     * log
     */
    LOG: 'log',
    /**
     * table
     */
    TABLE: 'table',
    /**
     * clear
     */
    CLEAR: 'clear',
    /**
     * warn
     */
    WARN: 'warn',
    /**
     * trace
     */
    TRACE: 'trace',
}

/**
 * 获取需要移除的Console类型
 * @param {*} propertys 
 * @returns 
 */
const _getRemoveConsolePropertys = (propertys = []) => {
    let arr = []
    for (let value of Object.values(_CONSOLE_ENUM)) {
        if (propertys.includes(value)) {
            if (value === _CONSOLE_ENUM.TIME) {
                arr.push('time')
                arr.push('timeEnd')
            } else if (value === _CONSOLE_ENUM.GROUP) {
                arr.push('group')
                arr.push('groupCollapsed')
                arr.push('groupEnd')
            } else {
                arr.push(value)
            }
        }
    }
    return arr
}

/**
 * 异常console输出
 * **注意**如果=>不使用()则不是返回的对象，将报错：throw new Error("Plugin/Preset did not return an object.");
 * @param {*} rootPath 
 */
const removeConsole = (propertys = []) => {
    let propertyArr = []
    if (propertys.length > 0) {
        propertyArr = _getRemoveConsolePropertys(propertys)
    }
    const CONSOLE = 'console'
    return rootPath => ({
        name: "ast-transform-remove-console",
        visitor: {
            ExpressionStatement: path => {
                // 获取console
                const object_name = get(path, 'node.expression.callee.object.name')
                // 匹配console
                if (eq(object_name, CONSOLE)) {
                    if (propertyArr.length > 0) {
                        const property_name = get(path, 'node.expression.callee.property.name')
                        // 匹配如: log
                        if (propertyArr.includes(property_name)) {
                            path.remove()
                        }
                    } else {
                        path.remove()
                    }    
                }
            }
        }
    })
} 

module.exports = removeConsole