
const svgCaptcha = require('svg-captcha')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1'
})

router.get('/captcha', async (ctx, next) => {
    var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size:4,    //验证码长度
        fontSize:50,   //字体大小
        width:120,
        height:40,
        background:getRanColor()
      });
      ctx.session.captcha=captcha.text;
      ctx.response.type = 'image/svg+xml';
    console.log(captcha.text)
      ctx.body = captcha.data;
})
// 获取随机验证码背景颜色
function  getRanColor() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    // 声明一个变量来接收得到的每一个 十六进制数
    var str = "#";
    // 循环六次
    for (var i = 0; i < 6; i++) {
        // 每一次都获取一个随机的值
        // 想要获取随机的值,首先要获取随机索引
        var ranIdx = parseInt(Math.random() * arr.length);

        // console.log(ranIdx);
        // 拼接 六位
        str += arr[ranIdx];

    }

    return str
}

module.exports = router
