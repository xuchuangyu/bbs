
const svgCaptcha = require('svg-captcha')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1'
})

router.get('/captcha', async (ctx, next) => {
    var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size:4,    //验证码长度
        fontSize:50,   //字体大小
        width:100,
        height:40,
        background:'#cc8801'
      });
      ctx.session.captcha=captcha.text;
      ctx.response.type = 'image/svg+xml';
      ctx.body = captcha.data;
})

module.exports = router
