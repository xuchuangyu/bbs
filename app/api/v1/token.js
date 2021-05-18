var moment = require('moment');
const Router = require('koa-router')
const axiox= require("axios")
const {
    APP_ID,
    API_KEY,
    SECRET_KEY,
  } = require('../../config/config').baidu;
const {
    TokenValidator
} = require(`../../validators/validator`)
const {
    LoginType
} = require(`../../lib/enum`)
const {
    User
} = require(`../../models/user`)
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/token'
})
/**
 * api /v1/token
 * type
 * account
 * secret
 * */
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get(`body.account`), v.get(`body.secret`))
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    //  ctx.response.set('my-token', token);
    axiox.post(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`).then((datas)=>{
        ctx.cookies.set('access_token',datas.data.access_token,{ maxAge: 30 * 60 * 1000 })// cookie有效时})
    })
    ctx.cookies.set(
        'token',//name
        token,//value
        {
            maxAge: 30 * 60 * 1000, // cookie有效时
        }
    )
    const datas = await User.findOne({
        where: {
            email: v.get(`body.account`)
        }
    })
    User.update({
        address:v.get(`body.address`),
        loginTime:moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
    },{
        where:{
            email: v.get(`body.account`)
        }
    })
    // console.log(moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'))
    // console.log(datas.loginTime)
    //ctx.session.token=token
    ctx.body = {
        success:1,
        msg:'操作成功',
        token,
        datas
    }
})
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return token = generateToken(user.id,account=='admin'?Auth.ADMIN:Auth.USER)
}

module.exports = router
