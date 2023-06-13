
// 菜单服务
const { Permissions } = require('../../../models/admin/permissions')
const {success} = require('../../../lib/helper')
const Router = require('koa-router');
const {addPermissionsValidator} = require('../../../validators/admin/permissions')
const router = new Router({
    prefix: '/api/v1/admin/permissions'
})
router.get('/',async (ctx)=>{
    const {menuId} = ctx.query;
    const data=await Permissions.findAndCountAll({
        where:{
            menuId:menuId||'',
        },
        attributes:{
            exclude:['created_at','deleted_at','updated_at']
        },
        raw:true
    })
    ctx.body={
        code:200,
        data:{
            list:data.rows,
            total:data.count
        },
        msg:'一切正常'
    }
})
router.get('/:id',async (ctx)=>{
    const { id }  = ctx.params;
    const data=await Permissions.findOne({
        where:{
            id,
        },
        attributes:{exclude:['created_at','deleted_at','updated_at']}
    })
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
    // success()
})
router.post('/',async (ctx)=>{
    const v=await new addPermissionsValidator().validate(ctx)
    await Permissions.create({
        name:v.get('body.name'),
        menuId:v.get('body.menuId'),
        btnPerm:v.get('body.btnPerm'),
        urlPerm:v.get('body.urlPerm'),
    })
    success();
})
router.put('/:id',async (ctx)=>{
    const { id } = ctx.params;
    const v=await new addPermissionsValidator().validate(ctx)
   await Permissions.update({
        name:v.get('body.name'),
        menuId:v.get('body.menuId'),
        btnPerm:v.get('body.btnPerm'),
        urlPerm:v.get('body.urlPerm'),
    },{
        where:{
            id,
        }
    })
    success();
})
module.exports = router;
