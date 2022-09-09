const {
    sequelize
} = require('../../core/db')
const bcrypt = require('bcryptjs')
const {
    Sequelize,
    Model
} = require('sequelize')
const { smsCodeValidator } = require('../validators/user')
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
  static async verifyAccountPassword(ctx){
      const { account,password,imgCode }= ctx.request.body;
      const user = await User.findOne({
          where: {
              account
          }
      })
      if(imgCode!=ctx.session.captcha){
          throw new global.errs.AuthFailed('图形验证码不正确')
      }
      if(!user){
          throw new global.errs.AuthFailed('账户不存在')
      }
      const correct = bcrypt.compareSync(password,user.password);
      if(!correct) {
          throw new global.errs.AuthFailed('密码不正确')
      }
      return user
  }
    static async verifyMobile(ctx){
       const { smsCode,mobile }= ctx.request.body;
       if(smsCode!=ctx.session.smsCode){
           throw new global.errs.AuthFailed('短信验证码不正确')
       }
        await new smsCodeValidator().validate(ctx);
        const user = await User.findOne({
            where: {
                mobile
            }
        })
        if(!user){
            throw new global.errs.AuthFailed('账户不存在')
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
    account:Sequelize.STRING,
    email:Sequelize.STRING,
    address:{
        type:Sequelize.STRING,
        defaultValue:"",
    },
    loginTime:{
        type:Sequelize.STRING,
        defaultValue:null,
    },
    mobile:{
        type:Sequelize.STRING,
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
