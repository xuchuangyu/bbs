
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/admin/usersRoles'
})
const { UserRoles } = require('../../../models/admin/userRoles')
const { AdminUser } = require('../../../models/admin/user')
const { Roles } = require('../../../models/admin/roles')
AdminUser.belongsToMany(Roles, { through: UserRoles,foreignKey:'UserId',otherKey:'RolesId'});
Roles.belongsToMany(AdminUser, { through: UserRoles ,foreignKey:'RolesId',otherKey:'UserId'});
module.exports = router
