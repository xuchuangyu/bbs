
const {
    Nav
} = require('../../models/nav')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
    NavValidator,
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/nav'
})
router.post('/create', async (ctx) => {
    const v = await new NavValidator().validate(ctx)
    const nav = {
        name:v.get('body.name'),
        url: v.get('body.url')
    }
    await Nav.create(nav)
    success()
})
router.get('/list',async (ctx,next)=>{
    let datas = await Nav.findAll();
    if(datas.length==0){
        throw new global.errs.NotFound()
    }
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})
module.exports = router
