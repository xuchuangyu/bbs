
const {
    sequelize
} = require('../../core/db')
 

const {
    Sequelize,
    Model
} = require('sequelize')

class AboutUs extends Model {
  
}

AboutUs.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    pic:Sequelize.STRING,
    introduction:Sequelize.STRING,
    qq:Sequelize.STRING,
    email:Sequelize.STRING,
},{
    sequelize,
    tableName:'aboutUs',
})

module.exports = {
    AboutUs 
}