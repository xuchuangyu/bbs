const {
    Log
} = require('../../models/log');
const {success} = require('../../lib/helper')
const {
    AboutUsValidator,
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/log'
})
router.post('/',(ctx)=>{

    success()
})
module.exports = router
