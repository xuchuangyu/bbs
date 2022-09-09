const { sequelize } = require('../../core/db');
const {  Sequelize,Model,DataTypes  } = require('sequelize');
const { Authority } = require('./authority')
class Menu extends Model{

}

Menu.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    pid:{
        type:DataTypes.INTEGER,
        defaultValue:-1,
        comment:'父级路由id'
    },
    title:{
        type:DataTypes.STRING,
        comment:"页面标题",
    },
    name:{
        type:DataTypes.STRING,
        comment:"路由名称",
    },
    path:{
        type:DataTypes.STRING,
        comment:"路由路径",
    },
    rank:{
        type:DataTypes.INTEGER,
        comment:"排序",
        defaultValue:100
    },
    icon:{
        type:DataTypes.STRING,
        comment:'图标',
    },
},{
    sequelize,
    tableName:'menu',
})
module.exports={
    Menu
}
