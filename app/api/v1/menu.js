const {
    Menu
} = require('../../models/menu');
const {
    Authority
} = require('../../models/authority')
const {success} = require('../../lib/helper')
const {
    addMenuValidator,
} =require('../../validators/menu')
const Router = require('koa-router')
// 关联 Authority
Menu.hasMany(Authority);

const router = new Router({
    prefix: '/api/v1/menu'
})
router.post('/add',async (ctx)=>{
    const v=await new addMenuValidator().validate(ctx);
    Menu.create({
        path:v.get('body.path'),
        name:v.get('body.name'),
        title:v.get('body.title'),
        pid:v.get('body.pid')||-1,
    })
    success();
})

router.get('/query',async (ctx)=>{
    const data=await Menu.findAll({
        where:{

        },
        attributes:['id','path','name','title','icon','rank'],
    })
    ctx.body={
        code:200,
        data
    }
})
module.exports = router
