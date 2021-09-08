import getFileTree from './get-tree';
import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";
import yargs from 'yargs';

function parseArgumentsIntoOptions(rawArgs) {
    const argv = yargs.usage("Usage: $0 [options]")
        .alias('O', 'output')
        .describe('O', '内容输出地址，默认为控制台打印')

        .alias('T', 'tag')
        .describe('T', '是否展示文件类型')

        .alias('L', 'level')
        .describe('L', '文件目录结构的展示层级')

        .alias('I', 'pattern')
        .describe('I', '需要排除的文件目录正在表达式，eg. "/node_modules|.git/"')

        .help('h')
        .alias('h', 'help')
        .showHelpOnFail(true, 'Specify --help for available options')
        .argv;

    return {
        tag: argv['tag'] || false,
        pattern: argv['pattern'] || false,
        level: argv['level'] || false,
        output: argv['output'] || false,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    options.targetDirectory = options.targetDirectory || process.cwd();

    console.log('%s', chalk.blue.bold('>> START 文件目录扫描....'));
    const treeData = getFileTree(options.targetDirectory, options);
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
