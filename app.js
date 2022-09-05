require('module-alias/register')
const Koa = require('koa')
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const koaStatic = require('koa-static')
const catchError = require('./middlewares/exception')
const session = require('koa-session');
const cors = require('koa-cors');

const app = new Koa()
onerror(app)
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000, //失效时间，默认是一天。
      overwrite: true,
      httpOnly: true, //表示是否可以通过javascript来修改，设成true会更加安全
      signed: true, //这个涉及到cookie的安全性
      rolling: false, //是涉及到cookie有效期的更新策略
      renew: false,  //是涉及到cookie有效期的更新策略
  };
app.use(cors)
app.use(session(CONFIG, app));
app.use(catchError)
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(koaStatic(path.join(__dirname,'./public')))

InitManager.initCore(app)

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
