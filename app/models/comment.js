
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
    articleId:Sequelize.INTEGER,
    pic:Sequelize.STRING,
    children:Sequelize.STRING,
      //草泥马数量
    read: {
        type: Sequelize.INTEGER,
        defaultValue:-1,
    },
    recycle: {
        type: Sequelize.INTEGER,
        defaultValue:-1,
    },
},{
    sequelize,
    tableName:'comment',
})

module.exports = {
    Comment 
}