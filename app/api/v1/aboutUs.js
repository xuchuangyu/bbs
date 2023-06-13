const {
    AboutUs
} = require('../../models/aboutUs')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
    AboutUsValidator,
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/aboutUs'
})
router.post('/create', async (ctx) => {
    let datas = await Nav.findAll();
    if(datas.length==1){
      throw new  global.errs.AboutUsException()
    }
    const v = await new AboutUsValidator().validate(ctx)
    const aboutUs = {
        name:v.get('body.name'),
        pic: v.get('body.url'),
        introduction: v.get('body.introduction'),
        qq: v.get('body.qq'),
        email: v.get('body.email'),
    }
     await AboutUs.create(aboutUs)
     success()
})


module.exports = router
