const { injectBabelPlugin, getLoader } = require('react-app-rewired')
const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

const cssLoaderMatcher = rule => rule.loader && rule.loader.indexOf(`css-loader`) != -1;

/* config-overrides.js */
module.exports = {
  webpack (config, env) {
    config = rewireMobX(config, env);
    config = injectBabelPlugin('transform-new-target', config);

    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@': path.join(__dirname, './src/components'),
      'util': path.join(__dirname, './src/util'),
      'view': path.join(__dirname, './src/view'),
      'model': path.join(__dirname, './src/model'),
      'store': path.join(__dirname, './src/store')
    });

    // 增加css module的支持
    const cssRules = getLoader(config.module.rules, rule => rule.test && String(rule.test) === String(/\.css$/));
    cssRules.test = /\.s?css$/;
    const cssLoader = getLoader(cssRules.use || cssRules.loader, cssLoaderMatcher);
    cssLoader.options = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    };
 
    // 增加额外的rule以便引入全局css文件   
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
    oneOf.unshift({
      test: /\.css$/,
      resourceQuery: /^\?raw$/,
      use: [require.resolve("style-loader"), require.resolve("css-loader")]
    });
    
    return config;
  },
  jest: config => config,
  devServer (configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 这个配置是webpack提供的另一种功能 适合vagrant共享目录下开发
      // aggregateTimeout 为 delay 意为1000毫秒之后没有修改才会进行刷新
      // poll 为每5000毫秒检查一次 的确很消耗性能 非vagrant共享目录下开发请关闭
      // 时间可以酌情添加
      config.watchOptions.aggregateTimeout = 1000;
      config.watchOptions.poll = 5000;
      return config;
    };
  }
};
