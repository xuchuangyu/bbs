
const {
    sequelize
} = require('../../core/db')
const { success } = require('../lib/helper')

const {
    Sequelize,
    Model
} = require('sequelize')
const { Category } = require('./category');
class Article extends Model {
    static async createArticle(ctx, v) {
        let article = {
            title: v.get('body.title'),
            author: v.get('body.author') || '',
            introduction: v.get('body.introduction') || '',
            content: v.get('body.content'),
            volume: v.get('body.volume') || '',
            category: v.get('body.category') || '',
        };
        await Article.create(article)
        if (v.get('body.category')) {
            Category.checkCategory(v.get('body.category'), Article)
        }
   
     //   success();
    }
    static async updateArticle(ctx, v){
        let datas= await Article.findOne({
            where:{
                id:v.get('path.id')
            }
        })
      
        let article = {
            title: v.get('body.title'),
            author: v.get('body.author') || '',
            introduction: v.get('body.introduction') || '',
            content: v.get('body.content'),
            volume: v.get('body.volume') || '',
            category: v.get('body.category') || '',
        };
        await Article.update(article,{
            where:{
                id:v.get('path.id')
            }
        })
        if(v.get('body.category')!=datas.category){
            Category.checkCategory(datas.category, Article)
        }
        Category.checkCategory(v.get('body.category'), Article)
     
    }
}

Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //文章标题
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'title'
    },
    //作者
    author: {
        type: Sequelize.STRING,
        field: 'author'
    },
    //简介
    introduction: {
        type: Sequelize.STRING,
        field: 'introduction'
    },
    //内容
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'content'
    },
    //文章分类
    category: {
        type: Sequelize.STRING,
        field: 'category'
    },
    //点赞数量
    goodNum: {
        type: Sequelize.INTEGER,
        unique: true
    },
    //无语数量
    speechlessNum: {
        type: Sequelize.INTEGER,
        unique: true
    },
    //草泥马数量
    cnmNum: {
        type: Sequelize.INTEGER,
        unique: true
    },
    //流泪数量
    tearsNum: {
        type: Sequelize.INTEGER,
        unique: true
    },
    //开心数量
    happyNum: {
        type: Sequelize.INTEGER,
        unique: true
    },
    //删除文章的状态
    delStatus: {
        type: Sequelize.INTEGER,
        unique: true
    },
}, {
    sequelize,
    tableName: 'article',
})

module.exports = {
    Article
}