const {  sequelize } = require('../../../core/db')
const { Sequelize,DataTypes,Model } = require('sequelize');

class ScheduleItem extends  Model{

}

ScheduleItem.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

},{
    sequelize,
    tableName:'schedule_item',
    comment:'单个班表信息'
})
module.exports = {
    ScheduleItem
}


