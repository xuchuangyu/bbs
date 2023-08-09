// 菜单服务
const { Depts } = require('../../../models/admin/depts')
const {success} = require('../../../lib/helper');
const { Op } = require('sequelize')
const { addDeptsValidator,putDeptsValidator } = require('../../../validators/admin/depts')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/admin/depts'
})



router.post('/add',async(ctx)=>{
    const v=await new addDeptsValidator().validate(ctx)
    Depts.create({
        parentId:v.get('body.parentId'),
        name:v.get('body.name'),
        sort:v.get('body.sort'),
        status:v.get('body.status'),
    })
    success()
})
router.get('/',async (ctx)=>{
    // const {name,status}= ctx.query;
    const query={parentId:0};
    for(let key in ctx.query){
        if(ctx.query[key]){
            query[key]={[Op.like]:`%${ctx.query[key]}%`}
        }
    }
    let data=await Depts.findDepts(query,{exclude:['updated_at','deleted_at','created_at']})
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})

router.get('/options',async (ctx)=>{
    let data=await Depts.findDepts({parentId:0},[['name','label'],['id','value']])
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})
router.get('/:id',async (ctx)=>{
    const {id} = ctx.params;
    let data=await Depts.findOne({where:{id},attributes:['id','name','parentId','sort','status']})
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})
router.put('/:id',async (ctx)=>{
    const {id} = ctx.params;
    const v=await new putDeptsValidator().validate(ctx)
    Depts.update({
        parentId:v.get('body.parentId'),
        name:v.get('body.name'),
        sort:v.get('body.sort'),
        status:v.get('body.status'),
    },{where:{id}})
    success()
})
router.del('/:ids',async (ctx)=>{
    const {ids} = ctx.params;
    await Depts.destroy({
        where:{
            id:ids.split(',')
        },
        // force:true,
        raw:true
    })
    success()
})
module.exports = router;
