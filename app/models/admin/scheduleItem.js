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
    date:{
        type:DataTypes.STRING,
        comment:'日期 (YYYY-MM-DD,YYYY-MM-DD,)逗号分割',
    },
    content:{
        type:DataTypes.STRING,
        defaultValue:0,
        comment:'班次（出勤=1 早班=2 午班=3  晚班=4 ）',
    },
},{
    sequelize,
    tableName:'schedule_item',
    comment:'单个班表信息'
})
module.exports = {
    ScheduleItem
}


