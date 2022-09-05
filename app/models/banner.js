const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize')
class Banner extends Model {

}
Banner.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    link:Sequelize.STRING,
    pic:Sequelize.STRING,
    //开心数量
    status: {
        type: Sequelize.INTEGER,
        defaultValue:0
    },
},{
    sequelize,
    tableName:'Banner',
})

module.exports = {
    Banner
}
