
const Router = require('koa-router')
const basicAuth = require('basic-auth')
const {success} = require('../../lib/helper')
const {
    Auth
} = require('../../../middlewares/auth')
const {User} = require('../../models/user')
const {
    ConnentValidator,
    getCommentValidator
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
        articleId:v.get('body.articleId')|| 99999 ,
        pic:v.get('body.pic') || '',
        children:JSON.stringify(v.get('body.children'))||'',
    }
    Comment.create(comment)
    ctx.body = {
        success:1,
        msg:'评论成功'
    }
})

router.get('/',new Auth().m, async (ctx) => {
    const v = await new getCommentValidator().validate(ctx)
    let query={};
    for(let key in ctx.query){
        if(ctx.query[key]!=''&&(key=='articleId'||key=='read'||key=='recycle')){
            query[key]=ctx.query[key]
        }
    }
    let datas = await Comment.findAndCountAll({
        where:query
    }) 
    if(datas.length==0){
        throw new global.errs.NotFound
    }
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})

module.exports = router