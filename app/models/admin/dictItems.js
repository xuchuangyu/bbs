
const {sequelize} = require('../../../core/db');
const {DataTypes,Model} = require('sequelize');

class DictItems extends Model{

}
DictItems.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    typeCode:{
        type:DataTypes.STRING,
        comment:"字段类型对应的Code",
    },
    name:{
        type:DataTypes.STRING,
        comment:"数据项名称",
    },
    status:{
        type:DataTypes.INTEGER,
        comment:'数据项状态',
    },
    value:{
        type:DataTypes.STRING,
        comment:'数据项值',
    },
    sort:{
        type:DataTypes.INTEGER,
        comment:'数据项排序',
    },
},{
    sequelize,
    tableName:'dictItems',
})
module.exports={
    DictItems
}
