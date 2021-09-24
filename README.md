# ftmap

基于 [directory-tree](https://www.npmjs.com/package/directory-tree) ,生成文件目录的树形结构展示

## install

```shell
npm install ftmap -g
```

## Example

1、无文件夹和文件标记区分

```shell
ftmap -L 3  -I "/node_modules|\.git/"
```

```text
├──assets
│   ├──scripts
│   └──styles
├──dist
├──src
│   ├──components
│   ├──pages
│   ├──plugins
│   ├──services
│   ├──index.tsx
│   └──main.ts
├──package-lock.json
└──package.json
```

2、标记文件夹和文件
```shell
ftmap -L 3  -I "/node_modules|\.git/" -T
```

```text
├──[D] assets
│   ├──[D] scripts
│   └──[D] styles
├──[D] dist
├──[D] src
│   ├──[D] components
│   ├──[D] pages
│   ├──[D] plugins
│   ├──[D] services
│   ├──[F] index.tsx
│   └──[F] main.ts
├──[F] package-lock.json
└──[F] package.json
```

3、带根目录文件夹

```shell
ftmap -L 3  -I "/node_modules|\.git/" -R -T
```

```text
[Root] demo
--------------------------------------------
├──[D] assets
│   ├──[D] scripts
│   └──[D] styles
├──[D] dist
├──[D] src
│   ├──[D] components
│   ├──[D] pages
│   ├──[D] plugins
│   ├──[D] services
│   ├──[F] index.tsx
│   └──[F] main.ts
├──[F] package-lock.json
└──[F] package.json
```

## Options

```
Usage: ftmap [options]

选项：
      --version  显示版本号                                               [布尔]
  -I, --pattern  需要排除的文件目录正则表达式（注意引号）
                 eg. "/node_modules|.git/"
  -L, --level    文件目录结构的展示层级
  -T, --tag      是否展示文件类型
  -O, --output   内容输出地址，默认为控制台打印
  -N, --nature   使用系统自然顺序，若不设置则默认显示为目录-文件的排序方式
  -R, --root     是否显示根目录
  -h, --help     显示帮助信息                                             [布尔]
```

## Document

`getFileTree(options)`

`options`默认值定义

```javascript
/**
 * 默认配置
 * @typedef {{output: null, level: number, nature: boolean, targetDirectory: *, root: boolean, pattern: string, tag: boolean}}
 * @type {BaseConfig}
 */
const baseConfig = {
    targetDirectory: process.cwd(),     // 待查看目录
    pattern: '',                        // 排除的文件
    level: Infinity,                    // 输出的层级
    tag: false,                         // 是否展示文件类型
    output: null,                       // 结果输出地址
    nature: false,                      // 是否为系统文件及文件夹的默认排序
    root: false                         // 是否展示根目录
};
```

使用示例

```javascript
import ftmap from 'ftmap';

ftmap.getFileTree({
    targetDirectory: path.resolve(__dirname, "../src"),
    pattern: /node_modules|.git|.history/, // 排除的文件
    level: 3, // 输出的层级
    tag: true, // 是否展示文件类型
    output: null,
    nature: false,
    root: false
});
```