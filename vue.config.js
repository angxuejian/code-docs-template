const path = require('path');
const setting = require('./src/setting')
module.exports = {
  pages: {
    index: {
      title: setting.title,
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // 区分不同环境下的路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 生成环境下不生产 sourcemap
  productionSourceMap: false,

  configureWebpack: {
 
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: setting.regMLoader,
          use: [
            { loader: 'vue-loader', options: { compilerOptions: { preserveWhitespace: false } } },
            { loader: path.resolve(__dirname, './src/md-loader/index.js') },
          ],
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 37.5, // 换算基数，1rem相当于37.5px, 值为37.5时, 375/10 =37.5
            exclude: /(node_module)/, // 利用正则表达式排除某些文件夹的方法
            mediaQuery: false,
            minPixelValue: 3, // 设置替换最小像素(3px以上才转rem)
          }),
        ],
      },
    },
  },


};
