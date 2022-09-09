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
app.use(cors({
    origin: function (ctx) {
        console.log(ctx.url)
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//加密的密钥，服务器通过加密的cookie获取session
app.keys = ['secret'];
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
