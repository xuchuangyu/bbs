const Router=require('koa-router');
const {generateArithmeticCaptcha} = require('../../../models/auth/captcha')
const { getUuid } = require('../../../../core/util')


const router=Router({
    prefix:'/api/v1/auth/captcha',
})

router.get('/',async (ctx)=>{
    const captcha= generateArithmeticCaptcha();
    console.log(captcha.equation);
    const verifyCodeKey=getUuid()
    console.log(`回答的MD5哈希值: ${captcha.answerHash}`);
    const {equation,captchaBase64,answerHash} =  captcha;
    ctx.session[verifyCodeKey]=answerHash
    ctx.body={
        code:200,
        data:{
            verifyCodeBase64:captchaBase64,
            verifyCodeKey,
        },
    }
})
module.exports = router;
