const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_DEV_API_URL,
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
    // app.use(
    //     '/viewer',
    //     createProxyMiddleware({
    //         target: process.env.REACT_APP_DEV_VIEWER_URL,
    //         changeOrigin: true,
    //         pathRewrite: { '^/viewer': '' }
    //     })
    // );

};