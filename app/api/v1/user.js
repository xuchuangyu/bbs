

const Router = require('koa-router')

const {success} = require('../../lib/helper')


const {
    RegisterValidator
} = require('../../validators/validator')
const {
    User
} = require('../../models/user')
const router = new Router({
    prefix: '/v1/user'
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


module.exports = router
