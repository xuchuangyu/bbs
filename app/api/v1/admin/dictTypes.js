
const { Op } = require('sequelize')
const { DictTypes } = require('../../../models/admin/dictTypes')
const {  success } = require('../../../lib/helper');
const {addDictTypesValidator} = require('../../../validators/admin/dict')
const Router = require('koa-router');

const router=new Router({
    prefix:'/api/v1/admin/dict-types'
})
router.get('/',async (ctx)=>{
    const { name }= ctx.query;
    const data=await DictTypes.findAndCountAll({
        where:{
            name:{
                [Op.like]:`%${name||''}%`
            }
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
    const data=await DictTypes.findOne({
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
    const v=await new addDictTypesValidator().validate(ctx);
    DictTypes.create({
        code:v.get('body.code'),
        status:v.get('body.status'),
        name:v.get('body.name'),
    })
    success()
})

router.put('/',async (ctx)=>{
    // 添加字典类型
    const v=await new addDictTypesValidator().validate(ctx);
    DictTypes.update({
        code:v.get('body.code'),
        status:v.get('body.status'),
        name:v.get('body.name'),
    },{
        where:{
            id:v.get('body.id'),
        }
    })
    success()
})
module.exports=router;
