const Router=require('koa-router');
const {postAuthLogin} =require('../../../validators/auth/login')
const {
    User
} = require(`../../../models/user`)
const { generateToken } = require('../../../../core/util')
const { Auth } = require('../../../../middlewares/auth')
const router=Router({
    prefix:'/api/v1/auth/login',
})

router.post('/',async (ctx)=>{
    const {username,password,uuid,code} =ctx.query;
    const v=await new postAuthLogin().validate(ctx);
    const token=accountLogin(ctx)
    ctx.body={
        code:200,
        data:{
            accessToken:token,
            refreshToken:null,
            expires:null,
            tokenType:'"Bearer"',
        },
    }
})
async function verifyAccountPassword(ctx){
    const { username,password,code,uuid }=ctx.query;
    const user = await User.findOne({
        where: {
            account:username,
        }
    })
    if(ctx.session[uuid]){
        throw new global.errs.AuthFailed('验证码已过期')
    }
    if(code!=ctx.session[uuid]){
        throw new global.errs.AuthFailed('验证码不正确')
    }
    if(!user){
        throw new global.errs.AuthFailed('账户不存在')
    }
    const correct = bcrypt.compareSync(password,user.password);
    if(!correct) {
        throw new global.errs.AuthFailed('密码不正确')
    }
    return user
}
// 账号密码登录
async function accountLogin(ctx){
    const {account} = ctx.request.body;
    const user =  await verifyAccountPassword(ctx)
    return generateToken(user.id,account=='admin'?Auth.ADMIN:Auth.USER)
}
module.exports = router;
