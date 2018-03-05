"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      // 开发模式->代理转发，不用跨域，server是3000端口
      // 线上部署的时候无法使用代理 通过nginx
      "/goods": {
        //否则就会访问的run dev后的8080端口
        target: "http://localhost:3000"
      },
      "/goods/*": {
        // /*通配符 匹配到任意一个以/goods开头的地址,将请求转发到3000端口处
        target: "http://localhost:3000"
      },
      "/users/**": {
        // /*通配符（代表二级路由） 匹配到任意一个以/users开头的地址
        // /** 匹配所有下级的路由
        target: "http://localhost:3000"
      }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8989, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
