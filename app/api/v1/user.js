

const Router = require('koa-router')

const {success} = require('../../lib/helper')
const {getCurDate} = require('../../../core/util')

const {
    MobileRegisterValidator,
    RegisterValidator
} = require('../../validators/user')
const {
    User
} = require('../../models/user')
const {MobilePhoneModel} = require('../../models/MobilePhoneModel')
const router = new Router({
    prefix: '/api/v1/user'
})

//注册 新增数据 put get delete
// 静态
/***
 *
 * 注册用户
 * email 邮箱
 * password1 密码1
 * password2 密码2
 * nickname 姓名
 *
 * */
router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    // email password
    // token jwt
    // token 无意义的随机字符串
    // 携带数据
    // uid jwt
    // await new RegisterValidator().validatePassword(ctx)
    // await new RegisterValidator().validateEmail(ctx)
    // 令牌获取 颁布令牌
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname'),
    }
    await User.create(user)
    success()
})
/**
 * 手机号码注册
 * mobile 手机号码
 * password 密码
 * account 用户名
 * smsCode 验证码
 * repeatPassword 确认密码
 * */
router.post('/mobileRegister',async(ctx)=>{
    // console.log(ctx)
    const v = await new MobileRegisterValidator().validate(ctx);
    let { smsCode }=ctx.request.body;
    if(smsCode!=ctx.session.smsCode){
        throw new Error('短信验证码不正确')
    }
    const user = {
        mobile: v.get('body.mobile'),
        password: v.get('body.password'),
        account: v.get('body.account'),
    }
    await User.create(user)
    success()
})

router.post('/sendSMSCode',async (ctx)=>{
    let { telnumber }=ctx.request.body;
    const clientIp=ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理IP
    ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
    ctx.req.connection.socket.remoteAddress || '';
    const curDate = getCurDate(); // 当前时间
    let args = {mobilePhone:telnumber,clientIp,curDate };
    try{
        let smsCodeData  =await MobilePhoneModel.dispatchSMSCode(args);
            // 将验证码保存入 session 中
            (smsCodeData.code === 200) && (ctx.session.smsCode = smsCodeData.smsCode);
        ctx.body = smsCodeData;
    }catch (error){
        console.log(error)
    }
})
module.exports = router
