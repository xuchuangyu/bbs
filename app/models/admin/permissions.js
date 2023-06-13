const {  sequelize } = require('../../../core/db')

const { Sequelize,DataTypes,Model } = require('sequelize')

class Permissions extends Model{

}
Permissions.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        comment:'权限名称',
    },
    btnPerm:{
        type:DataTypes.STRING,
        comment:'URL权限标识',
    },
    urlPerm:{
        type:DataTypes.STRING,
        comment:'URL权限标识',
    },
    menuId:{
        type:DataTypes.INTEGER,
        comment:'所属菜单id'
    },
},{
    sequelize,
    tableName:'permissions',
})
module.exports = {
    Permissions
}
