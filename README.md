<!--
 * @Author: your name
 * @Date: 2021-10-12 15:08:38
 * @LastEditTime: 2021-10-12 17:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /matias-babel/README.md
-->
# matias-babel

Babel 学习、使用、练习

## 允许

使用`pnpm`管理依赖。

* 下载依赖：
```
pnpm add
```

* 运行测试
```
pnpm run test
```
或
```
pnpx run test
```

## babel插件

### removeConsole

去除代码中的所有打印输出。

示例：
```js
const babel = require('@babel/core')
const removeConsole = require('../src/removeConsole')

const { transformAsync } = babel

/**
 * 转换
 * @param {*} code 
 * @param {*} type 
 * @returns 
 */
const transformCode = async (code = '', type = []) => {
    const res = await transformAsync(code, {
        plugins: [
            removeConsole(type)
        ]
    })
    return res.code
}

test('babel插件`remove console`测试', async () => {
    let value = 'const a = 10;'
    let oldCode = `
        ${value}
        console.time('计时器');
        console.group('分组');
        console.groupCollapsed('默认收起分组');
        console.assert(true === false, "判断条件不成立");
        console.groupEnd();
        console.count('count');
        console.error("Error: %s (%i)", "Server is not responding",500);
        console.info("西筹");
        console.log(a);
        console.table([ 
            { num: "1"},
            { num: "2"}, 
            { num: "3" }
        ]);
        console.clear();
        console.groupEnd();
        console.warn("警告");
        console.trace();
        console.timeEnd('计时器');
    `
    let newCode = await transformCode(oldCode);
    expect(newCode).toEqual(value)
})

test('babel插件`remove console` 移除log测试', async () => {
    let value = `const a = 10;`
    let oldCode = `
        ${value}
        console.log(a);
    `
    let newCode = await transformCode(oldCode, ['log']);
    expect(newCode).toEqual(value)
})
```

## 测试

使用[`Jest`](https://www.jestjs.cn/)做测试，