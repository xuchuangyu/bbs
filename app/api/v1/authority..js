const {
    Authority
} = require('../../models/authority');
const {
    Menu
} = require('../../models/menu');
const {success} = require('../../lib/helper')
const {
    addAuthorityValidator,
    editAuthorityValidator
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
            name:v.get('body.name'),
            code:v.get('body.code'),
            type:v.get('body.type'),
            status:v.get('body.status'),
        })
    success()
})
router.get('/query',async (ctx)=>{
    const { pageSize,pageNumber } = ctx.request.body
    const data= await Authority.findAndCountAll({
    attributes:['id','code','type','name','name','created_at','status'],
        offset:pageNumber||0,
        limit:pageSize||10,
    });
    ctx.body={
        code:200,
        data
    }
})
router.get('/:id',async (ctx)=>{
    const {id}=ctx.params
    const data=await Authority.findOne({where:{id}})
    ctx.body={
        code:200,
        data,
    }
})
router.put('/edit',async (ctx)=>{
    const v=await new  editAuthorityValidator().validate(ctx)
    const data=await Authority.findOne({where:{id:v.get('body.id')}})
    Authority.update(  {
        name:v.get('body.name')||data.name,
        code:v.get('body.code')||data.code,
        type:v.get('body.type')||data.type,
        status:v.get('body.status')||data.status
    } ,{
        where:{
            id:v.get('body.id'),
        },
    })
    success()
})
module.exports = router
