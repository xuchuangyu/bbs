
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
        Category.checkCategory(datas.category||v.get('body.category'), Article)
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
        type: Sequelize.TEXT('tiny'),
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
       defaultValue:0
    },
    //无语数量
    speechlessNum: {
        type: Sequelize.INTEGER,
        defaultValue:0
    },
    //草泥马数量
    cnmNum: {
        type: Sequelize.INTEGER,
        defaultValue:0
    },
    //流泪数量
    tearsNum: {
        type: Sequelize.INTEGER,
        defaultValue:0
    },
    //开心数量
    happyNum: {
        type: Sequelize.INTEGER,
        defaultValue:0
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
