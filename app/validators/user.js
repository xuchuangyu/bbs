
const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')


const { getCurDate } = require('../../core/util');
var moment = require('moment');
const {
    LoginType
} = require(`../lib/enum`)
class RegisterValidator extends LinValidator {
    constructor() {
        super()
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    async validateEmail(vals) {
        const {
            User
        } = require('../models/user');
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}
class MobileRegisterValidator extends LinValidator {
    constructor() {
        super()
    }
    validatePassword(vals) {
        const psw1 = vals.body.password
        const psw2 = vals.body.repeatPassword
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }
   async validateMobile(vals){
       const {
           User
       } = require('../models/user');
        const mobile= vals.body.mobile;
        const pattern=/^(86)?[1][3-9]\d{9}$/;
        if(!pattern.test(mobile)){
            throw new Error('手机号码格式不正确')
        }
       const user = await User.findOne({
            where: {
                mobile: mobile
            }
        })
       if (user) {
           throw new Error('手机号码已经被注册')
       }
    }
    async validateSmsCode(vals){
        const { MobilePhoneModel } = require('../models/MobilePhoneModel');
        const mobile= vals.body.mobile;
        const data=await MobilePhoneModel.findOne({
            where:{
                mobilePhone:mobile,
            },
        })
        if(!data){
            throw new Error('短信验证码不正确')
        }
    }
}


class TokenValidator103 extends LinValidator{
    constructor(){
        super()
        this.account = [
            new Rule(`isLength`,`不符合账号规则`,{
                min:4,
                max:32
            }),
        ]
        this.imgCode = [
            new Rule(`isLength`,`图形验证码不正确`,{
                max:4
            }),
        ]
        this.password=[
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符',{
                min:6,
                max:128
            })
        ]
    }
    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必须的参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}
class TokenValidator102 extends LinValidator{
    constructor(){
        super()
        this.smsCode=[
            new Rule('isOptional'),
            new Rule('isLength','短信验证码不正确',{
                max:6
            })
        ]
        this.mobile=[
            new Rule('matches','手机号码格式不正确',/^(86)?[1][3-9]\d{9}$/)
        ]
    }
}
// 校验短信验证码
class smsCodeValidator extends LinValidator{
    constructor() {
        super();
    }
    async validateSmsCode(vals){
        const { MobilePhoneModel } = require('../models/MobilePhoneModel');
        let curDate=getCurDate()
        const smsCodeModel = await MobilePhoneModel.findOne({
            where:{
                mobilePhone: vals.body.mobile,
                curDate,
            }
        })
        if(smsCodeModel){
            const { sendTimestamp } = smsCodeModel.dataValues;
            const diffVal=new moment().diff(new moment(sendTimestamp),'minutes');
            if(diffVal>=5){
                throw new Error('短信二维码过期')
            }
        }
    }
}
module.exports = {
    TokenValidator103,
    TokenValidator102,
    smsCodeValidator,
    RegisterValidator,
    MobileRegisterValidator,
}
