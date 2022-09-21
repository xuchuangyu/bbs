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
    const data=  Menu.findOne({
        where:{
            path:v.get('body.path'),
            name:v.get('body.name')
        }
    })
    console.log(data.id)
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
    const data=await findMenu(-1)
    ctx.body={
        code:200,
        data:data
    }
})
async function findMenu(pid){
    const data=await Menu.findAll({where:{pid},attributes:{exclude:['updated_at','deleted_at','created_at']}},)
    if(data.length>0){
        for(let item of data){
            let childData=await findMenu(item.id);
            if(childData.length>0){
                item.dataValues.children=childData
            }
        }
    }
    return  data
}
module.exports = router
