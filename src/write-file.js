import fs from 'fs';
import path from 'path';

export default function writeFile(path, data) {
    // todo 检测文件是否创建
    // todo 查看node 写文件的api
    return fs.writeFile(path, data)
}