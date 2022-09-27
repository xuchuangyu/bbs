const {AuthorityMenu} = require('../../models/AuthorityMenu');
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/AuthorityMenu'
})
const { Authority } = require('../../models/authority')
const { Menu } = require('../../models/menu')
Authority.belongsToMany(Menu, { through: AuthorityMenu,foreignKey:'AuthorityId',otherKey:'MenuId'});
Menu.belongsToMany(Authority, { through: AuthorityMenu ,foreignKey:'MenuId',otherKey:'AuthorityId'});
module.exports = router
