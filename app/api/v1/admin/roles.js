const Router=require('koa-router');
const {Roles} = require('../../../models/admin/roles')
const {success} = require('../../../lib/helper')
const { addRolesValidator } = require('../../../validators/admin/roles')

const router=Router({
    prefix: '/api/v1/admin/roles'
})

router.get('/pages',async (ctx)=>{
    const { pageNum,pageSize } = ctx.query;
    const data= await Roles.findAndCountAll({
            offset:parseInt(pageSize)*(parseInt(pageNum)-1),
            limit:parseInt(pageSize)||10,
    })
    ctx.body={
        code:200,
        data
    }
})
router.get('/options',async (ctx)=>{
    const data= await Roles.findAll({
        attributes:[['id','value'],['name','label']],
        raw:true,
    })
    ctx.body={
        code:200,
        data
    }
})
router.get('/:id',async (ctx)=>{
    const { id } = ctx.params;
    const data=await Roles.findOne({
        attributes:['id','name','code','status','sort','dataScope'],
        where:{
            id
        }
    })
    ctx.body={
        code:200,
        msg:'一切ok',
        data
    }
})
router.get('/:id/menuIds',async (ctx)=>{
    const { id } = ctx.params;
    const data=await Roles.findOne({
        where:{
            id
        }
    })
    let menusIds=[]
    if(data.menusIds){
        menusIds=data.menusIds.split(',')
    }
    // const menusIds=data.menusIds.split(',')
    ctx.body={
        code:200,
        data:menusIds,
        msg:'一切ok'
    }
})
router.put('/:id/menuIds',async (ctx)=>{
    const { id } = ctx.params;
    const  { body=[] } = ctx.request;
    Roles.update({
        menusIds:body.join(',')||''
    },{
        where:{
            id
        }
    },)
    success()

})


router.post('/',async (ctx)=>{
    const v = await new addRolesValidator().validate(ctx)
    Roles.create({
        name: v.get('body.name'),
        code: v.get('body.code'),
        dataScope: v.get('body.dataScope'),
        sort: v.get('body.sort'),
        status: v.get('body.status'),
    })

    success()
})

router.put('/:id',async (ctx)=>{
    const { id } =  ctx.query;
    const v = await new addRolesValidator().validate(ctx)
    Roles.update({
        name: v.get('body.name'),
        code: v.get('body.code'),
        dataScope: v.get('body.dataScope'),
        sort: v.get('body.sort'),
        status: v.get('body.status'),
    },{
        where:{
            id,
        }
    })
    success()
})


module.exports = router;
