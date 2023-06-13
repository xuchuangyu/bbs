// 菜单服务
const { Users } = require('../../../models/admin/users')
const {success} = require('../../../lib/helper')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/admin/users'
})


module.exports = router;
