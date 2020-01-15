
/**
 * 评论接口模型
 */
const {
    sequelize
} = require('../../core/db')
 

const {
    Sequelize,
    Model
} = require('sequelize')

class Comment extends Model {
  
}

Comment.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    content:Sequelize.STRING,
    nickName:Sequelize.STRING,
    pic:Sequelize.STRING,
    pid:Sequelize.INTEGER,

},{
    sequelize,
    tableName:'comment',
})

module.exports = {
    Comment 
}