'use strict';

const webpack = require('webpack');
const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger')
const app = koa();
const router =  new Router();
const serve = require('koa-static');

//webpack
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');


const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(function*(next) {
  yield webpackHotMiddleware(compiler).bind(null, this.req, this.res);
  yield next;
});

// serve files from ./dist
app.use(serve(__dirname + '/dist'));
app.use(logger());


app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', function(err) {
  console.log('error');
  router.redirect('/', 'sign-in');
});

app.listen(3003);
console.log('listening on port 3003')
