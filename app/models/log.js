const { sequelize } = require('../../core/db');

const {    Sequelize,
    Model} = require('sequelize');
class Log extends Model {

}
Log.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    uId:Sequelize.STRING,
    code:Sequelize.INTEGER,
    msg:Sequelize.STRING,
},{
    sequelize,
    tableName:'aboutUs',
})

module.exports = {
    Log
}
