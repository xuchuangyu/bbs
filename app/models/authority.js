const { sequelize } = require('../../core/db');
const { Sequelize,Model,DataTypes } = require('sequelize');
const {Menu} = require('./menu')
class Authority extends Model{

}

Authority.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        comment:"角色名称",
    },
    code:{
        type:DataTypes.STRING,
        comment:'角色标识'
    },
    type:{
        type:DataTypes.INTEGER,
        comment:'角色类型（1=内置|2 = 自定义）'
    },
    status:{
        type:DataTypes.INTEGER,
        comment:'角色状态（1=启用|0=关闭）',
        defaultValue:0
    },
},{
    sequelize,
    tableName:'authority',
})
module.exports={
    Authority
}
