// 菜单服务
const {Op} = require('sequelize')
const { Menus } = require('../../../models/admin/menus')
const { Roles } = require('../../../models/admin/roles')
const { AdminUser } = require('../../../models/admin/user')
const {success} = require('../../../lib/helper')
const { addMenuValidator ,editMenuValadator} = require('../../../validators/admin/menus')
const {
    Auth
} = require('../../../../middlewares/auth')

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/admin/menus'
})
router.get('/',async (ctx)=>{
    //   菜单查询
    const query={parentId:0};
    for(let key in ctx.query){
        if(!['pageSize','pageNumber','total'].includes(key)){
            if(ctx.query[key]){
                query[key]={[Op.like]:`%${ctx.query[key]}%`}
            }
        }
    }
    let data=await Menus.findMenus(query,{exclude:['updated_at','deleted_at','created_at']})
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})
router.get('/options',async (ctx)=>{
    //   菜单配置查询
    const query={parentId:0};
    for(let key in ctx.query){
        if(!['pageSize','pageNumber','total'].includes(key)){
            if(ctx.query[key]){
                query[key]={[Op.like]:`%${ctx.query[key]}%`}
            }
        }
    }
    let data=await Menus.findMenus(query,[['id','value'],['name','label']])
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})
router.get('/routes',new Auth().m,async (ctx)=>{
    const { uid } = ctx.auth;
    const query={parentId:0,type:{[Op.ne]:'BUTTON'}};
    const Udata = await AdminUser.findOne({
        where:{
            id:uid
        }
    })
   const UdataRoles=await Udata.getRoles({raw:true});
    let roles=UdataRoles.map(item=>{
        return item.code
    })
    let menusIds=[];
    for(let item of UdataRoles){
        menusIds.push(...item.menusIds.split(','))
    }
    query['id']=Array.from(new Set(menusIds))
    let data=await Menus.findRouteMenus(roles,query)
    ctx.body={
        code:200,
        data,
        msg:'一切ok'
    }
})
router.get('/:id',async (ctx)=>{
    // 获取菜单详情
    const { id } = ctx.params;
    const data=await Menus.findOne({
        where:{
            id
        }
    })
    ctx.body={
        code:200,
        data,
        msg:'一切正常'
    }
})

router.post('/',async(ctx)=>{
    // 添加菜单
    const v= await  new addMenuValidator().validate(ctx)
    Menus.create({
        parentId:v.get('body.parentId'), // 父级菜单
        name:v.get('body.name'),
        type:v.get('body.type'),
        perm:v.get('body.perm'),
        path:v.get('body.path'),
        icon:v.get('body.icon'),
        visible:v.get('body.visible'),
        sort:v.get('body.sort'),
        component:v.get('body.component'),
    })
    success();
})




router.put('/:id',async (ctx)=>{
    const { id }  = ctx.params;
    // 添加菜单
    const v= await  new editMenuValadator().validate(ctx)
    Menus.update({
        parentId:v.get('body.parentId'), // 父级菜单
        name:v.get('body.name'),
        type:v.get('body.type'),
        perm:v.get('body.perm'),
        path:v.get('body.path'),
        icon:v.get('body.icon'),
        visible:v.get('body.visible'),
        sort:v.get('body.sort'),
        component:v.get('body.component'),
    },{
        where:{
            id
        }
    })
    success();
})

module.exports = router;
