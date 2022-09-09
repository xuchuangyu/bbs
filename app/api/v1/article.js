const {
    Article
} = require('../../models/article')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
   ArticleValidator,
   PositiveIntegerValidator
} =require('../../validators/validator')
const {
    Auth
} = require('../../../middlewares/auth')
const { Category } = require('../../models/category');
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/article'
})
//创建文章
router.post('/create',new Auth().m,async (ctx,next)=>{
    let v=await new ArticleValidator().validate(ctx);
    Article.createArticle(ctx,v)
    ctx.body={
        success:1,
        msg:'操作成功'
    }
});
router.get('/list',new Auth().m,async (ctx,next)=>{
    let query={};
    //模糊搜索
    for(let key in ctx.query){
        if(ctx.query[key]!=''&&(key=='title'||key=='category')){
            query[key]={[global.op.like]:'%' + ctx.query[key] + '%'}
        }
    }
    let datas = await Article.findAndCountAll({
        where:query
     });
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})
router.put('/:id',new Auth().m,async (ctx,next)=>{
    let v=await new ArticleValidator().validate(ctx);
     Article.updateArticle(ctx,v)
     success()
})
router.delete('/:id',new Auth().m,async (ctx,next)=>{
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
    Category.checkCategory(datas.category, Article)
    ctx.body={
        success:1,
        msg:'操作成功'
    }
})
router.get('/:id',new Auth().m,async (ctx,next)=>{
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
