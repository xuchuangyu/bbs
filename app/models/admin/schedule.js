const {  sequelize } = require('../../../core/db')
const { Sequelize,DataTypes,Model } = require('sequelize');

class Schedule extends  Model {

}

Schedule.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        comment:'班表名称',
    },
    setting:{
        type:DataTypes.INTEGER,
        comment:'班次设置 1-1班次，2-2班次，3-3班次',
    },
    type:{
        type:DataTypes.INTEGER,
        comment:'班表类型 1-周，2-月',
    },
    state:{
        type:DataTypes.INTEGER,
        comment:'班表状态 1 - 正常 0 - 停用',
    },
},{
    sequelize,
    tableName:'schedule',
    comment:'班表'
})
module.exports = {
    Schedule
}
