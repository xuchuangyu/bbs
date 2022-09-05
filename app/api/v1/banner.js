const {  Banner } = require('../../models/banner')
const {success} = require('../../lib/helper')
const {
    Auth
} = require('../../../middlewares/auth')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/banner'
})
router.get('/list',new Auth().m,async (ctx,next)=>{
    let query={};
    let datas = await Banner.findAndCountAll({
        where:query
    });
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})
module.exports = router
