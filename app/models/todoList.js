
const {
    sequelize
} = require('../../core/db')
 

const {
    Sequelize,
    Model
} = require('sequelize')

class TodoList extends Model {
  
}

TodoList.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:Sequelize.STRING,
    status:Sequelize.INTEGER,
    del:{
        type:Sequelize.INTEGER,
        defaultValue:-1
    }
},{
    sequelize,
    tableName:'todoList',
})

module.exports = {
    TodoList 
}