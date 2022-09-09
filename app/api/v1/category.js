
const {
    Category
} = require('../../models/category')
const {
    Article
} = require('../../models/article')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
    NavValidator,
} =require('../../validators/validator')
const {
    Auth
} = require('../../../middlewares/auth')

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/category'
})
router.get('/',new Auth().m,async (ctx,next)=>{
    let datas = await Category.findAll({
        where:{
            number: {[global.op.gt]:0}
        }
    });
    let number=0;
    for(let item of datas){
        number+=parseInt(item.number)
    }
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas,
        number
    }
})
module.exports = router
