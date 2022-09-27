const { sequelize } = require('../../core/db');
const { Model,DataTypes } = require('sequelize');
const { Authority } = require('./authority')
const { User } = require('./user')
class AuthorityUser extends Model{

}
AuthorityUser.init({
    AuthorityId:{
        type:DataTypes.INTEGER,
        references:{
            model:Authority,
            key:'id'
        },
    },
    UserId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id'
        },
    },
},{
    sequelize,
    tableName:'AuthorityUser'
})



module.exports={
    AuthorityUser
}
