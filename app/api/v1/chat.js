const {
    Chat
} = require('../../models/chat')
// const {} =require('@validators')
const { success } = require('../../lib/helper')
const {
    AboutUsValidator,
} = require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/chat'
})

module.exports = router