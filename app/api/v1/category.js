
const {
    Category
} = require('../../models/category')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
    NavValidator,
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/category'
})
module.exports = router