const Router=require('koa-router');
const { Base64 } = require('js-base64')
const {postAuthLogin} =require('../../../validators/auth/login')
const { AdminUser }= require(`../../../models/admin/user`)
const bcrypt = require('bcryptjs')
const { generateToken } = require('../../../../core/util')
const { Auth } = require('../../../../middlewares/auth')
const router=Router({
    prefix:'/api/v1/auth/login',
})

router.post('/',async (ctx)=>{
    const v=await new postAuthLogin().validate(ctx);
    const token=await accountLogin(ctx)
    ctx.body={
        code:200,
        data:{
            access_token:Base64.encode(token+':'),
            refreshToken:null,
            expires:null,
            token_type:'Basic',
        },
    }
})
async function verifyAccountPassword(ctx){
    const { username,password,code,uuid }=ctx.query;
    const user = await AdminUser.findOne({
        where: {
            username:username,
        },
    })
    if(!ctx.session[uuid]){
        throw new global.errs.AuthFailed('验证码已过期')
    }
    if(code!=ctx.session[uuid]){
        throw new global.errs.AuthFailed('验证码不正确')
    }
    if(!user){
        throw new global.errs.AuthFailed('账户不存在')
    }
    const correct = bcrypt.compareSync(password,user.dataValues.password);
    if(!correct) {
        throw new global.errs.AuthFailed('密码不正确')
    }
    const Ddata=user.getDept({raw:true})
    if(Ddata.status===0){
        throw new global.errs.AuthFailed('部门已经被禁用了');
    }
    return user
}
// 账号密码登录
async function accountLogin(ctx){
    const {username} = ctx.request.body;
    const user =  await verifyAccountPassword(ctx)
    return generateToken(user.id,username=='admin'?Auth.ADMIN:Auth.USER)
}
module.exports = router;
