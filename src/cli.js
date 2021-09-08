import arg from "arg";
import getFileTree from './get-tree';
import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";

function parseArgumentsIntoOptions(rawArgs) {
    console.log('rawArgs', rawArgs)
    const args = arg({
        '--tag': Boolean,       // 是否显示文件类型
        '-T': '--tag',

        '--level': Number,      // 显示的层级
        '-L': '--level',

        '--pattern': String,    // exclude file
        '-I': '--pattern',

        '--output': String,     // 输出
        '-O': '--output'
    }, {
        argv: rawArgs.slice(2),
    });

    return {
        tag: args['--tag'] || false,
        pattern: args['--pattern'] || false,
        level: args['--level'] || false,
        output: args['--output'] || false,
    };
}

export async function cli(args) {
    console.log(args)
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
