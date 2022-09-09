var moment = require('moment');
const Router = require('koa-router')
const axiox= require("axios")
const {
    APP_ID,
    API_KEY,
    SECRET_KEY,
  } = require('../../config/config').baidu;
const {
    TokenValidator103,
    TokenValidator102
} = require(`../../validators/user`)
const {
    LoginType
} = require(`../../lib/enum`)
const {
    User
} = require(`../../models/user`)
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/api/v1/token'
})
/**
 * api /v1/token
 * type
 * 账号登录
 * account(type=103)
 * password(type=103)
 * imgCode(type=103)
 * 手机号码登录
 * mobile(type=102)
 * smsCode(type=102)
 * */
router.post('/', async (ctx) => {
    const {type} = ctx.request.body;
    let token;
    switch (type) {
        case LoginType.USER_ACCOUNT:
            const v = await new TokenValidator103().validate(ctx)
            token = await accountLogin(ctx)
            break
        case LoginType.USER_MOBILE:
            await new TokenValidator102().validate(ctx)
            token = await mobileLogin(ctx)
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    //  ctx.response.set('my-token', token);
    axiox.post(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`).then((datas)=>{
        // ctx.cookies.set('access_token',datas.data.access_token,{ maxAge: 30 * 60 * 1000 })// cookie有效时})
    })

    // console.log(moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'))
    // console.log(datas.loginTime)
    //ctx.session.token=token
    ctx.body = {
        code:200,
        msg:'操作成功',
        token,
    }
})
async function emailLogin(account, secret,address) {
    const user = await User.verifyEmailPassword(account, secret);
    User.update({
        address:address,
        loginTime:moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
    },{
        where:{
            email: account
        }
    })
    return token = generateToken(user.id,account=='admin'?Auth.ADMIN:Auth.USER)
}

// 账号密码登录
async function accountLogin(ctx){
    const {account} = ctx.request.body;
    const user = await User.verifyAccountPassword(ctx);

    return token = generateToken(user.id,account=='admin'?Auth.ADMIN:Auth.USER)
}

// 手机号码登录
async function mobileLogin(ctx){
    const user = await User.verifyMobile(ctx);
    return token = generateToken(user.id,Auth.ADMIN)
}
module.exports = router
