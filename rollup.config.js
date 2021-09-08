import babel from "rollup-plugin-babel";
import {terser} from 'rollup-plugin-terser';

export default {
    input: 'src/cli.js',
    output: {
        name: 'ftmap',
        file: './dist/ftmap.js',
        format: 'umd'
    },
    plugins: [
        // resolve(),  // 这样 Rollup 能找到 `ms`
        // commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
        // eslint({
        //     throwOnError: true,
        //     throwOnWarning: true,
        //     include: ['src/**'],
        //     exclude: ['node_modules/**']
        // }),
        // babel({
        //     exclude: 'node_modules/**', // 防止打包node_modules下的文件
        //     runtimeHelpers: true,       // 使plugin-transform-runtime生效
        // }),
        terser()
    ]
};