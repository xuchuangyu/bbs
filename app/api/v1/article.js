const {
    Article
} = require('../../models/article')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
   ArticleValidator,
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/article'
})
//创建文章
router.post('/create',async (ctx,next)=>{
    let v=await new ArticleValidator().validate(ctx);
    Article.createArticle(ctx,v)
});
router.get('/list',async (ctx,next)=>{
    let datas = await Article.findAndCountAll();
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