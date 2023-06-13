const {  sequelize } = require('../../../core/db')
const bcrypt = require('bcryptjs')
const { Sequelize,DataTypes,Model } = require('sequelize')
const { Depts } = require('./depts')
class Users extends Model{


}
Users.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    gender:{
        type:DataTypes.INTEGER,
        comment:'性别（男=1|女=2）',
    },
    mobile:{
        type:DataTypes.STRING,
        comment:'手机号码',
    },
    nickname:{
        type:DataTypes.STRING,
        comment:'用户名称'
    },
    deptId:{
        type:DataTypes.INTEGER,
        comment:'所属部门（id）'
    },
    deptName:{
        type:DataTypes.VIRTUAL,
        comment:'所属部门名称',
        async get(){
          let data = await Depts.findOne({where:{id:this.dataValues.deptId}});
          return data.name;
        },
    },
    email:{
        type:DataTypes.STRING,
        comment:'电子邮箱',
    },
    username:{
        type:DataTypes.STRING,
        comment:'用户名',
    },
    password:{
        type:DataTypes.STRING,
        comment:'密码',
        set(val){
            const salt= bcrypt.genSaltSync(10);
            const psw=bcrypt.hashSync(val,salt);
            this.setDataValue('password',psw);
        }
    },
},{
    sequelize,
    tableName:'users',
})
module.exports={
    Users
}
