const {
    Article
} = require('../../models/article')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
   ArticleValidator,
   PositiveIntegerValidator
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/article'
})
//创建文章
router.post('/create',async (ctx,next)=>{
    let v=await new ArticleValidator().validate(ctx);
    Article.createArticle(ctx,v)
    ctx.body={
        success:1,
        msg:'操作成功'
    }
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
router.put('/:id',async (ctx,next)=>{
    let v=await new ArticleValidator().validate(ctx);
     Article.updateArticle(ctx,v)
     success()
})
router.delete('/:id',async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx);
    let datas= await Article.findOne({
        where:{
            id:v.get('path.id')
        }
    })
    if(!datas){
        throw new  global.errs.AuthFailed('文章不存在')
    }
    await Article.update({delStatus:1},{where:{
        id:v.get("path.id")
    }})
   await Article.destroy({
        where:{
            id:v.get("path.id")
        }
    })

    ctx.body={
        success:1,
        msg:'操作成功'
    }
})
router.get('/:id',async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx);
    let datas= await Article.findOne({
        where:{
            id:v.get('path.id')
        }
    })
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
  //  Article.
})
module.exports = router