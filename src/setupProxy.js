const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://recruiting.api.bemmbo.com/',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/invoices/pending',
    createProxyMiddleware(proxy)
  );
};