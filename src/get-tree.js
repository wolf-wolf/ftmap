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
 * @typedef {{level: number, pattern?: string, tag: boolean, targetDirectory: string}} BaseConfig
 * @type {BaseConfig}
 */
const baseConfig = {
    pattern: '',        // 排除的文件
    level: Infinity,    // 输出的层级
    tag: false,         // 是否展示文件类型
    targetDirectory: process.cwd()
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

    for (let i = 0; i < tree.length; i++) {
        let parentFlagsBk = parentFlags;
        let item = tree[i];
        res += _getIndent_(curLevel, parentFlagsBk);
        let isLast = i === tree.length - 1;

        if (isLast) {
            res += '└──';
            parentFlagsBk += '0';
        } else {
            res += '├──';
            parentFlagsBk += '1';
        }

        const tagTxt = `[${FILE_TYPE_MAP[item.type]}] `

        res += `${tag ? tagTxt : ''}${item.name}\n`;

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
    });

    let treeList = fileStructData.children;

    return _traverseTree_(treeList, 0, '', options)
}
