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
│   ├──imgs
│   │   └──a.png
│   ├──scripts
│   │   └──common.js
│   └──styles
│       └──index.css
└──src
    ├──index.ts
    └──utils.ts
```

2、标记文件夹和文件

```text
├──[D] assets
│   ├──[D] imgs
│   │   └──[F] a.png
│   ├──[D] scripts
│   │   └──[F] common.js
│   └──[D] styles
│       └──[F] index.css
└──[D] src
    ├──[F] index.ts
    └──[F] utils.ts
```

## Options

```
-O, --output   内容输出地址，默认为控制台打印
-T, --tag      是否展示文件类型
-L, --level    文件目录结构的展示层级
-I, --pattern  需要排除的文件目录正则表达式，eg. "/node_modules|.git/"
-h, --help     显示帮助信息
    --version  显示版本号
```