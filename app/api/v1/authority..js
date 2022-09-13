const {
    Authority
} = require('../../models/authority');
const {
    Menu
} = require('../../models/menu');
const {success} = require('../../lib/helper')
const {
    addAuthorityValidator,
} =require('../../validators/menu')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/authority'
})
// Authority 属于 Menu
Authority.belongsTo(Menu)
router.post('/add',async (ctx)=>{
    const v=await new  addAuthorityValidator().validate(ctx)
        Authority.create({
            name:v.get('body.name')
        })
    success()
})
router.get('/query',async (ctx)=>{
    const data= await Authority.findAll({
    attributes:['id','name'],
    });
    ctx.body={
        code:200,
        data
    }
})
module.exports = router
