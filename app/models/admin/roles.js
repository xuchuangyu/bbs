const {  sequelize } = require('../../../core/db')


const { Sequelize,DataTypes,Model } = require('sequelize')



class Roles extends  Model{

}
Roles.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        comment:'角色名称',
    },
    sort:{
        type:DataTypes.INTEGER,
        comment:'排序',
    },
    dataScope:{
        type:DataTypes.INTEGER,
        comment:'数据权限 （全部数据 = 0 部门及子部门数据 = 1 本部门数据 = 2 本人数据 ）',
    },
    code:{
        type:DataTypes.STRING,
        comment:'角色编码',
    },
    status:{
        type:DataTypes.INTEGER,
        comment:'状态（正常=1 停用 = 2）',
    },
    menusIds:{
        type:DataTypes.STRING,
        comment:'角色分配的菜单权限id',
    },
},{
    sequelize,
    tableName:'roles',
})
module.exports = {
    Roles
}
