const { sequelize } = require('../../core/db');
const { Sequelize,Model,DataTypes } = require('sequelize');
const {Menu} = require('./menu')
class Authority extends Model{

}

Authority.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        comment:"角色名称",
    },
    menuId:{
        type:Sequelize.INTEGER,
    },
},{
    sequelize,
    tableName:'authority',
})
module.exports={
    Authority
}
