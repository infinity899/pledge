const path = require('path');

module.exports = {
  publicPath: '/',
  pluginOptions: {
    lintStyleOnBuild: false,
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'translations',
      enableInSFC: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve('./src/static/css')],
        data: '@import "globals.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(_ => (
        { name: '[name]_[contenthash].[ext]' }
      ));
  },
};
