var moment = require('moment');
const {
    sequelize
} = require('../../core/db')

const bcrypt = require('bcryptjs')
const {
    Sequelize,
    Model
} = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email,plainPassword){
      const user = await User.findOne({
          where: {
            email
          }
      })
      if(!user){
          throw new global.errs.AuthFailed('账户不存在')
      }
      const correct = bcrypt.compareSync(plainPassword,user.password)

      if(!correct) {
        throw new global.errs.AuthFailed('密码不正确')
      }
      return user
  }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:Sequelize.STRING,
    address:{
        type:Sequelize.STRING,
        defaultValue:"",
    },
    loginTime:{
        type:Sequelize.STRING,
        defaultValue:null,
    },
    password:{
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
},{
    sequelize,
    tableName:'user',
})
module.exports = {
    User
}
