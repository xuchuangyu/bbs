const {
    Menu
} = require('../../models/menu');
const {
    Authority
} = require('../../models/authority')
const {success} = require('../../lib/helper')
const {
    addMenuValidator,
    editMenuValidator,
} =require('../../validators/menu')
const Router = require('koa-router')


const router = new Router({
    prefix: '/api/v1/menu'
})
router.post('/add',async (ctx)=>{
    const v=await new addMenuValidator().validate(ctx);
    const data= await Menu.findOne({
        where:{
            path:v.get('body.path'),
            name:v.get('body.name')
        }
    })
    if(data.id){
        throw new global.errs.AuthFailed('菜单已存在')
    }
    Menu.create({
        path:v.get('body.path'),
        name:v.get('body.name'),
        title:v.get('body.title'),
        pid:v.get('body.pid')||-1,
    })
    success();
})
router.put('/edit',async (ctx)=>{
    const v=await new editMenuValidator().validate(ctx);
    const data=await  Menu.findOne({
        where:{
            id:v.get('body.id'),
        }
    })
    if(!data.id){
        throw new global.errs.AuthFailed('菜单不存在')
    }
    Menu.update({
        path:v.get('body.path'),
        name:v.get('body.name'),
        title:v.get('body.title'),
        pid:v.get('body.pid')||-1,
    },{
        where:{
            id:v.get('body.id'),
        }
    })
    success();
})
router.get('/findAll',async (ctx)=>{
    const data=await Menu.findAll({
        attributes:{
            exclude:['updated_at','deleted_at','created_at']
        },
    })
    ctx.body={
        code:200,
        data
    }
})

router.get('/treeList',async(ctx)=>{
    const data=await Menu.findMenu({pid:-1})
    ctx.body={
        code:200,
        data:data
    }
})
router.get('/treeList/:id',async(ctx)=>{
    const {id}=ctx.params;
    const data=await Menu.findMenu({pid:-1,aid:id})
    ctx.body={
        code:200,
        data:data
    }
})
module.exports = router
