import dirTree from "directory-tree";

/**
 * 文件类型对应的缩写Tag，D：文件夹，F：文件
 * @type {{file: string, directory: string}}
 */
const FILE_TYPE_MAP = {
    directory: 'D',
    file: 'F',
};

/**
 * @description 获取当前行前不的占位符
 * @param level {number} 当前的
 * @param parentFlags {string} 前序列是否需要进行补位 0：否，1：是
 * @returns {string}
 * @private
 * 示例
 * level = 3;
 * parentFlags = '001';
 *
 * 返回 '        │   '
 */
function _getIndent_(level, parentFlags) {
    let res = '';

    for (let i = 0; i < level; i++) {
        if (parentFlags[i] === '0') {
            res += '    ';
        } else {
            res += '│   ';
        }
    }

    return res;
}

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

/**
 * @description 遍历数据，拼合文本
 * @param tree {Array} 数据
 * @param curLevel {number} 当前的层级
 * @param parentFlags {string} 前序列是否需要进行补位 0：否，1：是
 * @param options {BaseConfig} 配置对象
 * @returns {string}
 * @private
 */
function _traverseTree_(tree, curLevel, parentFlags, options) {
    const {level, tag} = options;

    let levelLimit = level || Infinity;
    let res = '';

    // 文件名比较函数
    function fileNameCompare(a, b) {
        let avsName = a.name.toLowerCase();
        let bvsName = b.name.toLowerCase();
        if (a > b) {
            return -1;
        } else if (b > a) {
            return 1;
        } else {
            return 0;
        }
    }

    let sortTree = tree
    if (!options.nature) {
        let dirTree = tree.filter(item => item.type === 'directory').sort(fileNameCompare);
        let fileTree = tree.filter(item => item.type === 'file').sort(fileNameCompare);
        sortTree = dirTree.concat(fileTree);
    }

    for (let i = 0; i < sortTree.length; i++) {
        let parentFlagsBk = parentFlags;
        let item = sortTree[i];
        res += _getIndent_(curLevel, parentFlagsBk);
        let isLast = i === sortTree.length - 1;

        if (isLast) {
            res += '└──';
            parentFlagsBk += '0';
        } else {
            res += '├──';
            parentFlagsBk += '1';
        }

        const tagTxt = `[${FILE_TYPE_MAP[item.type]}] `

        res += `${tag ? tagTxt : ''}${item.name}\n`;

        // child的循环
        if (item.children && curLevel + 1 < levelLimit) {
            res += _traverseTree_(item.children, curLevel + 1, parentFlagsBk, options);
        }
    }

    return res;
}

/**
 * @description 生成文件结构文本
 * @param [options] {BaseConfig} 配置项
 * @returns {string}
 */
export default function getFileTree(options = baseConfig) {
    let {pattern, targetDirectory} = options;

    targetDirectory = targetDirectory || process.cwd();

    let excludePattern = '';  // 需要剔除的文件的正则表达式

    if (Object.prototype.toString.call(pattern) === '[object String]') {
        excludePattern = new RegExp(pattern.substring(1, pattern.length - 2))
    } else if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
        excludePattern = pattern;
    }

    let fileStructData = dirTree(targetDirectory, {
        exclude: excludePattern,
        attributes: ['type']
    });

    let treeList = fileStructData.children;

    let res = _traverseTree_(treeList, 0, '', options);

    if (options.root) {
        let pathArr = targetDirectory.split('/');

        const resArr = res.split('\n');
        let maxLen = 0;

        for (let i = 0; i < resArr.length; i++) {
            maxLen = Math.max(maxLen, resArr[i] ? resArr[i].length : 0)
        }

        let line = ''.padStart(maxLen + 20, '-');

        res = (options.tag ? '[Root] ' : '') + pathArr[pathArr.length - 1] + '\n' + line + '\n' + res;
    }

    return res;
}
