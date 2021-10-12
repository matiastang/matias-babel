/*
 * @Author: matiastang
 * @Date: 2021-10-12 15:14:26
 * @LastEditTime: 2021-10-12 16:27:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /matias-babel/src/removeConsole.js
 */
const babel = require('@babel/core')
const get = require('lodash/get')
const eq = require('lodash/eq')

const { transformAsync } = babel

/**
 * 异常console输出
 * **注意**如果=>不使用()则不是返回的对象，将报错：throw new Error("Plugin/Preset did not return an object.");
 * @param {*} rootPath 
 */
const removeConsole = rootPath => ({
    name: "ast-transform-remove-console",
    visitor: {
        ExpressionStatement: path => {
            // 获取console
            const name = get(path, 'node.expression.callee.object.name')
            const CONSOLE = 'console'
            // DOTO: - 可以更精准的定位，比如只移除console.log()的输入
            if (eq(name, CONSOLE)) {
                path.remove()
            }
        }
    }
})

module.exports = removeConsole