const { sequelize } = require('../../core/db');
const {  Sequelize,Model,DataTypes  } = require('sequelize');

class Menu extends Model{

    /**
     * obj:{pid:(父级id),aid:(角色id)}
     * */
    static async findMenu(obj){
        const { Authority } = require('./authority')
        let pid=obj.pid||-1;
        let aid=obj.aid;
        const data=await Menu.findAll({where:{pid},attributes:{exclude:['updated_at','deleted_at','created_at']}},)
        if(data.length>0){
            for(let item of data){
                const { id }=item.dataValues;
                if(aid){
                    let aData =  await  Authority.findOne({where:{id:aid}});
                    item.dataValues.checked=await aData.hasMenu(item);
                }
                let childData=await this.findMenu({pid:id,aid:obj.aid});
                if(childData.length>0){
                    item.dataValues.children=childData
                }
            }
        }
        return  data
    }
}

Menu.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    pid:{
        type:DataTypes.INTEGER,
        defaultValue:-1,
        comment:'父级路由id'
    },
    title:{
        type:DataTypes.STRING,
        comment:"页面标题",
    },
    name:{
        type:DataTypes.STRING,
        comment:"路由名称",
    },
    path:{
        type:DataTypes.STRING,
        comment:"路由路径",
    },
    rank:{
        type:DataTypes.INTEGER,
        comment:"排序",
        defaultValue:100
    },
    icon:{
        type:DataTypes.STRING,
        comment:'图标',
    },
},{
    sequelize,
    tableName:'menu',
})
module.exports={
    Menu
}
