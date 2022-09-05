
const {
    sequelize
} = require('../../core/db')

const {
    Sequelize,
    Model
} = require('sequelize')

class Category extends Model {
    static async  checkCategory(name, Article) {
        let datas = await Category.findOne({
            where: {
                name,
            }
        })
        let ArticleCount = await Article.findAndCountAll({
            where: {
                category:name
            }
        });
        if (!datas) {
            Category.create({ name, number: 1 })
        } else {
            Category.update({ number: ArticleCount.count }, {
                where: {
                    name,
                }
            })
        }
    }
}

Category.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    number: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'category',
})

module.exports = {
    Category
}
