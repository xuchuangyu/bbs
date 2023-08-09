const { sequelize } = require('../../../core/db');
const { Model,DataTypes } = require('sequelize');
const { Roles } = require('./roles')
const { User } = require('./user')
class UserRoles extends Model{

}
UserRoles.init({
    UserId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id'
        },
    },
    RolesId:{
        type:DataTypes.INTEGER,
        references:{
            model:Roles,
            key:'id'
        },
    },
},{
    sequelize,
    tableName:'UserRoles'
})



module.exports={
    UserRoles: UserRoles
}
