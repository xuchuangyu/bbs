// 字段类型
const { sequelize } = require('../../../core/db')

const {DataTypes,Model} = require('sequelize');

class DictTypes extends Model{

}
DictTypes.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    code:{
        type:DataTypes.STRING,
        comment:"字典类型【字段编码】",
        unique:true,
    },
    status:{
        type:DataTypes.INTEGER,
        comment: "字典类型【字段状态】（启用=1|禁用=0）",
    },
    name:{
        type:DataTypes.STRING,
        comment:"字段类型【字段名称】",
    },
},{
    sequelize,
    tableName:'dictTypes',
})

module.exports={
    DictTypes
}
