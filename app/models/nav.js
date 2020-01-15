
const {
    sequelize
} = require('../../core/db')
 

const {
    Sequelize,
    Model
} = require('sequelize')

class Nav extends Model {
  
}

Nav.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    url:Sequelize.STRING,
},{
    sequelize,
    tableName:'nav',
})

module.exports = {
    Nav 
}