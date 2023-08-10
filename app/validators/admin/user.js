const { LinValidator,Rule } = require('../../../core/lin-validator-v2');
const { AdminUser } = require('../../models/admin/user')

class addUser extends LinValidator{
    constructor() {
        super();
        this.username=[
            new Rule('isLength','username不能为空',{ min : 1 })
        ]
        this.nickname=[
            new Rule('isLength','nickname不能为空',{ min : 1 })
        ]
    }
      async validateUsername(vals){
        const username = vals.body.username
        const data= await AdminUser.findOne({
            where:{
                username:username
            }
        })
        if(data){
            throw new Error('用户名已存在')
        }
    }
     async validateMobile(vals){
        const { mobile } = vals.body
        if(mobile){
            const data=await AdminUser.findOne({
                where:{
                    mobile
                }
            })
            if(data){
                throw new Error('手机号码已存在')
            }
        }

    }
}

class editUser extends LinValidator{
    constructor() {
        super();
        this.username=[
            new Rule('isLength','username不能为空',{ min : 1 })
        ]
        this.nickname=[
            new Rule('isLength','nickname不能为空',{ min : 1 })
        ]

    }
    // static  async validateUsername(vals){
    //   const username = vals.body.username
    //   const data= await AdminUser.findOne({
    //         where:{
    //             name:username
    //         }
    //     })
    //    if(data){
    //        throw new Error('用户名已存在')
    //    }
    // }
    // static async validateMobile(vals){
    //     const mobile = vals.body.mobile;
    //     const data=await AdminUser.findOne({
    //         where:{
    //             mobile
    //         }
    //     })
    //     if(data){
    //         throw new Error('手机号码已存在')
    //     }
    // }
}
class importUser extends LinValidator{
    constructor() {
        super();
        this.file=[
            new Rule('isLength','file不能为空',{ min : 1 })
        ]


    }

}

module.exports = {
    addUser,
    editUser,
    importUser
}
