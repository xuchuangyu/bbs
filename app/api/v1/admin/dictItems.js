
const { Op } = require('sequelize')
const { DictItems } = require('../../../models/admin/dictItems')
const {  success } = require('../../../lib/helper');
const {addDictItemsValidator,putDictItemsValidator} = require('../../../validators/admin/dict')
const Router = require('koa-router');

const router=new Router({
    prefix:'/api/v1/admin/dict-items'
})
router.get('/',async (ctx)=>{
    const { name ,typeCode}= ctx.query;
    const data=await DictItems.findAndCountAll({
        where:{
            name:{
                [Op.like]:`%${name||''}%`
            },
            typeCode:typeCode,
        },
        raw:true
    })
    ctx.body={
        code:200,
        data:{
            list:data.rows,
            total:data.count,
        },
        msg:'一切正常'
    }
})

router.get('/:id',async(ctx)=>{
    const { id } = ctx.params;
    const data=await DictItems.findOne({
        where:{
            id,
        },
        attributes:{
            exclude:['created_at','deleted_at','updated_at']
        }
    })
    ctx.body={
        code:200,
        data,
    }
})
router.post('/',async (ctx)=>{
    // 添加字典类型
    const v=await new addDictItemsValidator().validate(ctx);
    DictItems.create({
        typeCode:v.get('body.typeCode'),
        name:v.get('body.name'),
        sort:v.get('body.sort'),
        status:v.get('body.status'),
        value:v.get('body.value'),
    })
    success()
})

router.put('/:id',async (ctx)=>{
    const { id } = ctx.params;
    // 添加字典类型
    const v=await new addDictItemsValidator().validate(ctx);
    DictItems.update({
        typeCode:v.get('body.typeCode'),
        name:v.get('body.name'),
        sort:v.get('body.sort'),
        status:v.get('body.status'),
        value:v.get('body.value'),
    },{
        where:{
            id,
        }
    })
    success()
})
module.exports=router;
