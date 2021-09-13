# ftmap

基于 [directory-tree](https://www.npmjs.com/package/directory-tree) ,生成文件目录的树形结构展示

## install

```shell
npm install ftmap -g
```

## Example

1、无文件夹和文件标记区分

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

## Options

```
Usage: ftmap [options]

选项：
      --version  显示版本号                                               [布尔]
  -O, --output   内容输出地址，默认为控制台打印
  -T, --tag      是否展示文件类型
  -L, --level    文件目录结构的展示层级
  -N, --nature   使用系统自然顺序，若不设置则默认显示为目录-文件的排序方式
  -I, --pattern  需要排除的文件目录正则表达式（注意引号）
                 eg. "/node_modules|.git/"
  -h, --help     显示帮助信息                                             [布尔]
```

## Document

`getFileTree(options)`

`options`默认值定义

```javascript
/**
 * 默认配置
 * @typedef {{level: number, pattern?: string, tag: boolean, targetDirectory: string}} BaseConfig
 * @type {BaseConfig}
 */
const baseConfig = {
    pattern: '',        // 排除的文件
    level: Infinity,    // 输出的层级
    tag: false,         // 是否展示文件类型
    targetDirectory: process.cwd()
};
```

使用示例

```javascript
import ftmap from 'ftmap';

ftmap.getFileTree({
    pattern: /node_modules|.git|.history/, // 排除的文件
    level: 3, // 输出的层级
    tag: true, // 是否展示文件类型
    targetDirectory: path.resolve(__dirname, "../src"),
});
```