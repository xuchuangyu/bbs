// 菜单服务
const {Op} = require('sequelize')
const { Menus } = require('../../../models/admin/menus')
const {success} = require('../../../lib/helper')
const { addMenuValidator ,editMenuValadator} = require('../../../validators/admin/menus')
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
