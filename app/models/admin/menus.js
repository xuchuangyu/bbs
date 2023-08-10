const {  sequelize } = require('../../../core/db')

const { Sequelize,DataTypes,Model } = require('sequelize')

class Menus extends Model{
    static async findMenus(params,attributes){
        // let pid=obj.pid||-1;
        const data=await Menus.findAll({where:{...params},attributes,raw:true})
        if(data.length>0){
            for(let item of data){
                const { id,value }=item;
                let childData=await this.findMenus({
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
    static async findRouteMenus(roles,params,attributes){
        // let pid=obj.pid||-1;
        let obj=[]
        const data=await Menus.findAll({where:{...params},raw:true})
        if(data.length>0){
            for(let item of data){
                const { component,path,icon,name , id } = item
                let childData=await this.findRouteMenus(roles,{
                    ...params,
                    parentId:id,

                });
                obj.push(
                     {
                        component,
                        path,
                        children:childData,
                        meta:{
                            hidden:false,
                            keepAlive:true,
                            icon,
                            roles,
                            title:name,
                        },
                    }
                )

            }
            console.log(obj)
        }
        return obj;
    }
}
Menus.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    perm:{
        type:DataTypes.STRING,
        comment:'权限标识',
    },
    icon:{
        type:DataTypes.STRING,
        comment:'图标',
    },
    name:{
        type:DataTypes.STRING,
        comment:'菜单名称',
    },
    parentId:{
        type:DataTypes.INTEGER,
        comment:'父级菜单',
        defaultValue:0,
    },
    path:{
        type:DataTypes.STRING,
        comment:'跳转路由',
    },
    component:{
        type:DataTypes.STRING,
        comment:"组件路径",
        defaultValue:'Layout',
    },
    sort:{
        type:DataTypes.INTEGER,
        comment:'排序',
    },
    type:{
        type:DataTypes.STRING,
        comment:"菜单类型（菜单=CATALOG|目录=MENU|外链=EXTLINK|BUTTON）",
    },
    visible:{
        type:DataTypes.INTEGER,
        comment:"菜单状态（显示=1，隐藏=0）",
    },
},{
    sequelize,
    tableName:'menus',
})
module.exports = {
    Menus
}
