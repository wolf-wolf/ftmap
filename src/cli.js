import getFileTree from './get-tree';
import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";
import yargs from 'yargs';

function parseArgumentsIntoOptions(rawArgs) {
    const argv = yargs.usage("Usage: $0 [options]")
        .alias('I', 'pattern')
        .describe('I', '需要排除的文件目录正则表达式（注意引号）\neg. "/node_modules|.git/"')

        .alias('L', 'level')
        .describe('L', '文件目录结构的展示层级')

        .alias('T', 'tag')
        .describe('T', '是否展示文件类型')

        .alias('O', 'output')
        .describe('O', '内容输出地址，默认为控制台打印')

        .alias('N', 'nature')
        .describe('N', '使用系统自然顺序，若不设置则默认显示为目录-文件的排序方式')

        .alias('R', 'root')
        .describe('R', '是否显示根目录')

        .help('h')
        .alias('h', 'help')
        .showHelpOnFail(true, 'Specify --help for available options')
        .argv;

    return {
        pattern: argv['pattern'] || false,
        level: argv['level'] || false,
        tag: argv['tag'] || false,
        output: argv['output'] || false,
        nature: argv['nature'] || false,
        root: argv['root'] || false,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    console.log('%s', chalk.blue.bold('>> START 文件目录扫描....'));

    const treeData = getFileTree(options);
    console.log('%s', chalk.green.bold('>> DONE 文件目录扫描...'));

    if (options.output) {
        console.log('%s', chalk.blue.bold(`>> START 文件写入....[${options.output}]`));
        fs.writeFileSync(path.resolve(options.output), treeData);
        console.log('%s', chalk.green.bold('>> DONE 文件写入....'));
    } else {
        console.log(treeData);
    }

    console.log('%s', chalk.green.bold('>> DONE 执行完成....'));
}

const ftmap = {
    getFileTree
};

export default ftmap;
