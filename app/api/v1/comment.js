
const Router = require('koa-router')
const basicAuth = require('basic-auth')
const {success} = require('../../lib/helper')
const {
    Auth
} = require('../../../middlewares/auth')
const {User} = require('../../models/user')
const {
    ConnentValidator
} = require('../../validators/validator')
const {
    Comment
} = require('../../models/comment')
const router = new Router({
    prefix: '/v1/comment'
})

//注册 新增数据 put get delete
// 静态

router.post('/',new Auth().m, async (ctx) => {
   const v = await new ConnentValidator().validate(ctx)
   let uDate=await User.findOne({
        where:{
            id:ctx.auth.uid
        }
    })
    const comment = {
        content: v.get('body.content'),
        nickName:uDate.nickname,
        pic:v.get('body.pic') || '',
        pid:v.get('body.pid') || -1
    }
    Comment.create(comment)
    ctx.body = {
        success:1,
        msg:'评论成功'
    }
})


module.exports = router