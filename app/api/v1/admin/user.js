
const Router= require('koa-router')
const send = require('koa-send');
const xlsx = require('xlsx');
const { Depts } = require('../../../models/admin/depts')
const { Roles } = require('../../../models/admin/roles')
const { AdminUser } =  require('../../../models/admin/user')
const { addUser,editUser,importUser } = require('../../../validators/admin/user')
const { koaBody } = require('koa-body');
const {success} = require('../../../lib/helper')

AdminUser.belongsTo(Depts,{foreignKey:'deptId'})


const router=Router({
    prefix:'/api/v1/admin/users',
})

router.get('/pages',async (ctx)=>{
    const { pageNum,pageSize } = ctx.query;
    const data=await AdminUser.findAndCountAll({
        offset:parseInt(pageSize)*(parseInt(pageNum)-1),
        limit:parseInt(pageSize)||10,
    })
    const {rows,count} =data;
    for(let item of rows){
        const RDate=await item.getRoles({raw:true})
        item.dataValues.rolesName=RDate.map(item=>{
            return item.name
        })
        const DDate=await item.getDept({raw:true})
        item.dataValues.deptName=DDate.name;
    }

    ctx.body={
        code:200,
        data:{
            list:rows,
            total:count
        },
    }
})

router.post('/',async (ctx)=>{
    const v= await  new addUser().validate(ctx)
    const DeptModel = await Depts.findOne({
        where:{id:v.get('body.deptId')}
    })
    const RolesModel= await Roles.findAll({
        where:{
            id:v.get('body.roleIds')
        }
    })
   const data=await AdminUser.create({
        avatar:v.get('body.avatar'),
        username:v.get('body.username'),
        nickname:v.get('body.nickname'),
        mobile:v.get('body.mobile'),
        gender:v.get('body.gender'),
        email:v.get('body.email'),
        status:v.get('body.status'),
    })
   await data.setDept(DeptModel);
   await data.setRoles(RolesModel);
    success()
})

router.get('/template',  async (ctx)=>{
    const templateName = '用户导入模板 (1).xlsx'; // 下载的文件名
    ctx.set('content-disposition',`templateName=${encodeURIComponent(templateName)}`)
    await send(ctx, templateName,{
        root:'public/template'
    });
})

router.post('/_import', koaBody({ multipart: true }), async (ctx)=>{
    const { deptId } = ctx.request.body;
    // // 获取上传的文件
    const file = ctx.request.files.file;
    const workbook = xlsx.readFile(file.filepath);
    // // 获取第一个工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // // // 将工作表转换为JSON对象
    const data = xlsx.utils.sheet_to_json(worksheet);
    if(data.length==0){
        throw new global.errs.AuthFailed('表格数据为空')
    }
    for(let row of data){
        let Rdata=null
        for(let key in row){
            if(['用户名','昵称','角色'].includes(key)&&!row[key]){
                row.status='2';
                row.msg=`${key}不能为空`;
                break ;
            }
            if(key=='角色'){
                Rdata= await Roles.findAll({
                    where:{
                        name:row[key]
                    },
                })
                if(!Rdata){
                    row.status='2';
                    row.msg='角色不存在';
                    break;
                }
            }
            if(key=='手机号码' || key=='用户名'){
                const UData= await  AdminUser.findAll({
                    where:key=='用户名'?{
                        username:row[key]
                    }:{
                        mobile:row[key]
                    }
                })
                if(UData){
                    row.status='2';
                    row.msg=`${key}已存在`;
                    break;
                }
            }
        }
        if(row.status!='2'){
            const DeptModel= await  Depts.findOne({
                where:{
                    id:deptId,
                }
            })
            const data= await  AdminUser.create({
                username:row['用户名'],
                nickname:row['昵称'],
                mobile:row['手机号码'],
                gender:row['性别']=='男'?1:row['性别']=='男'?2:3,
                email:row['邮箱'],
                status:1,
            })
            await data.setDept(DeptModel);
            await data.setRoles(Rdata);
            row.status='1';
        }

    }
    const text=[];
    for(let [key,row] of data.entries()){
        text.push(`第${key+1}行，导入${row.status=='1'?'成功':`失败 失败原因是 ${row.msg}`}`)
    }
    ctx.body={
        code:200,
        data:text.join(','),
        msg:'一切 ok'
    }

})

router.get('/:id/form',async (ctx)=>{
    const { id } = ctx.params
   const data= await AdminUser.findOne({
        where:{
            id
        }
    })
    const RDate=await data.getRoles();
    data.dataValues.roleIds= RDate.map(item=>{
        return item.dataValues.id
    })
    ctx.body={
        code:200,
        data,
        msg:'一切ok'
    }
})
router.put('/:id',async (ctx)=>{
    const { id } = ctx.params
    const v = await new editUser().validate(ctx)

    const data=await AdminUser.update({
        avatar:v.get('body.avatar'),
        username:v.get('body.username'),
        nickname:v.get('body.nickname'),
        mobile:v.get('body.mobile'),
        gender:v.get('body.gender'),
        email:v.get('body.email'),
        status:v.get('body.status'),
    },{
        where:{
            id
        }
    })
    const AdminData=await  AdminUser.findOne({where:{id}})
    const DeptModel = await Depts.findOne({
        where:{id:v.get('body.deptId')}
    })
    const RolesModel= await Roles.findAll({
        where:{
            id:v.get('body.roleIds')
        }
    })
    await AdminData.setDept(DeptModel);
    await AdminData.setRoles(RolesModel);
    success()
})
module.exports = router;
