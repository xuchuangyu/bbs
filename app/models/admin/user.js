const { Model,DataTypes ,Deferrable } = require('sequelize')
const bcrypt = require('bcryptjs')
const {Depts} = require('./depts')
const {  sequelize } =  require('../../../core/db')

class AdminUser extends Model{

}

AdminUser.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    avatar:{
        type:DataTypes.STRING,
        defaultValue:'',
        comment:'用户头像',
    },
    email:{
        type:DataTypes.STRING,
        defaultValue:'',
        comment:'电子邮件',
    },
    gender:{
        type:DataTypes.INTEGER,
        comment:'性别（ 1= 男 2 = 女 ）'
    },
    mobile:{
        type:DataTypes.STRING,
        defaultValue:'',
        comment:'手机号码',
    },
    deptId:{
        type:DataTypes.INTEGER,
        comment:'部门关联id',
    },
    password:{
        type: DataTypes.STRING,
        comment:'密码',
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    nickname:{
        type:DataTypes.STRING,
        defaultValue:'',
        comment:'用户名称',
        // set:async function(val){
        //    const data=await AdminUser.findOne({where:{nickname:val}})
        //     if(data){
        //         throw new Error('用户名称重复')
        //     }else{
        //         this.setDataValue('nickname', val)
        //     }
        // }
    },
    // roleIds:{
    //     type:DataTypes.STRING,
    //     defaultValue:'',
    //     comment:'角色id',
    // },
    status:{
        type:DataTypes.INTEGER,
        comment:'用户状态 （正常 =  1 禁用 = 2）',
    },
    username:{
        type:DataTypes.STRING,
        defaultValue:'',
        comment:'用户名',
    },
},{
    sequelize,
    tableName:'admin_user',
})
module.exports = {
    AdminUser
}

