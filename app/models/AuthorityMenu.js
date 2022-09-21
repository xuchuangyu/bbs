const { sequelize } = require('../../core/db');
const { Model,DataTypes } = require('sequelize');
const { Authority } = require('./authority')
const { Menu } = require('./menu')
class AuthorityMenu extends Model{

}
AuthorityMenu.init({
    AuthorityId:{
        type:DataTypes.INTEGER,
        references:{
            model:Authority,
            key:'id'
        },
    },
    MenuId:{
        type:DataTypes.INTEGER,
        references:{
            model:Menu,
            key:'id'
        },
    },
},{
    sequelize,
    tableName:'AuthorityMenu'
})

Authority.belongsToMany(Menu, { through: AuthorityMenu });
Menu.belongsToMany(Authority, { through: AuthorityMenu });

module.exports={
    AuthorityMenu
}
