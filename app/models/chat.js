
const {
    sequelize
} = require('../../core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

class Chat extends Model {
    static FindRoodIdDate() {

    }
    static async updateChatDate(roomId, msgObj) {
        let date = await this.findOne({ roomId })
        let new_msgObj = JSON.parse(date.dataValues.msgObj);
        for (let item of msgObj) {
            new_msgObj.push(item)
        }
        if (!date) {
            this.create({
                roomId,
                msgObj: JSON.stringify(msgObj)
            })
        } else {
            this.update({ msgObj: JSON.stringify(new_msgObj) }, {
                where: {
                    roomId,
                }
            })
        }
    }
}

Chat.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: Sequelize.STRING,
        defaultValue: "123456"
    },
    msgObj: {
        type: Sequelize.TEXT('tiny'),
        allowNull: false,
        field: 'msg_obj'
    }
}, {
    sequelize,
    tableName: 'chat',
})

module.exports = {
    Chat
}