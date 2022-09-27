const {AuthorityUser} = require('../../models/AuthorityUser');
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/AuthorityUser'
})
const { Authority } = require('../../models/authority')
const { User } = require('../../models/user')
Authority.belongsToMany(User, { through: AuthorityUser,foreignKey:'AuthorityId',otherKey:'UserId'});
User.belongsToMany(Authority, { through: AuthorityUser ,foreignKey:'UserId',otherKey:'AuthorityId'});
module.exports = router
