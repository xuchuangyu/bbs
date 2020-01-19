
const {
    Category
} = require('../../models/category')
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
    prefix: '/v1/category'
})
router.get('/',new Auth().m,async (ctx,next)=>{
    let datas = await Category.findAll({
        where:{
            number: {[global.op.gt]:0}
        }
    });
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})
module.exports = router