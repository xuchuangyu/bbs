const {  sequelize } = require('../../../core/db')

const { Sequelize,DataTypes,Model } = require('sequelize');

class Depts extends Model{
    static async findDepts(params,attributes){
        // let pid=obj.pid||-1;
        const data=await Depts.findAll({where:{...params},attributes,raw:true})
        if(data.length>0){
            for(let item of data){
                const { id,value }=item;
                let childData=await this.findDepts({
                    ...params,
                    parentId:id||value
                },attributes);
                if(childData.length>0){
                    item.children=childData
                }
            }
        }
        return data;
    }
}
Depts.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,

    },
    email:{
        type:DataTypes.STRING,
        comment:'部门邮箱'
    },
    leader:{
      type:DataTypes.STRING,
      comment:'部门领导'
    },
    mobile:{
        type:DataTypes.BIGINT(11),
        comment:'部门电话'
    },
    name:{
        type:DataTypes.STRING,
        comment:'部门名称'
    },
    parentId:{
        type:DataTypes.STRING,
        comment:'上级部门',

    },
    sort:{
        type:DataTypes.INTEGER,
        comment:'排序',
    },
    status:{
        type:DataTypes.INTEGER,
        comment:'部门状态（启用=1|禁用=0）'
    },
},{
    sequelize,tableName:'depts'
})

module.exports={
    Depts
}
