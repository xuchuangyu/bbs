const {
    sequelize
} = require('../../core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

class MobilePhoneModel extends Model {
    /**
     * 发送短信验证码
     * 一个手机号每天最多发送 6 条验证码
     * 同一个 ip，一天只能向手机号码发送 10 次
     */
    static async  dispatchSMSCode({ mobilePhone, clientIp, curDate }){
            let smsSendMax = 6; // 设定每个手机号短信发送限制数
            let ipCountMax = 10; // 设定 ip 数 限制数
            let smsCode = '';  // 随机短信验证码
            let smsCodeLen = 6; // 随机短信验证码长度
            for(let i=0;i<smsCodeLen;i++){
                smsCode+=Math.floor(Math.random()*10);
            }
            try{
                // 根据当前日期，手机号查询改手机号当天的发送次数
                let mobilePhoneDoc = await MobilePhoneModel.findOne({where:{
                        mobilePhone,curDate
                    }});
                let clientIpCount =  await MobilePhoneModel.findAndCountAll({where:{
                        clientIp,curDate
                }});
                if(mobilePhoneDoc){
                    const{sendCount,id} = mobilePhoneDoc.dataValues
                    // 说明次数未到限制，可继续发送
                    if(mobilePhoneDoc.sendCount <smsSendMax && clientIpCount.count<ipCountMax){
                        let newSendCount = sendCount+1;
                        MobilePhoneModel.update({
                            sendCount:newSendCount,sendTimestamp:+new Date()
                        },{where:{id}})
                        return {smsCode,code:200,msg:'验证码发送成功'};
                        // let data = sendSMSCode(smsCode,mobilePhone);
                        // switch(data.errorCode){
                        //     case 0:
                        //      return {smsCode,code:200,msg:'验证码发送成功'};
                        //     case 10012:
                        //         return {smsCode,code:500,msg:'没有免费短信了'};
                        //     default :
                        //         return {smsCode,code:400,msg:'未知错误'};
                        }else{
                            return { code:400,msg:'当前手机号码发送次数达到上限，明天重试' }
                        }
                    }else{
                    // 执行发送短信验证码
                    // const data =  sendSMSCode(mobilePhone,smsCode);
                    MobilePhoneModel.create({mobilePhone,clientIp,curDate,sendCount:1,sendTimestamp:+new Date()});
                    return {smsCode,code:200,msg:'短信验证码发送成功'}
                }
            }catch (err){
                console.log(err)
            }
        }
}
MobilePhoneModel.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    sendCount:Sequelize.INTEGER,
    mobilePhone:Sequelize.STRING,
    clientIp:Sequelize.STRING,
    curDate:{
        type:Sequelize.STRING,
        defaultValue:null,
    },
    sendTimestamp:{
        type: Sequelize.DATE,
    },
},{
    sequelize,
    tableName:'MobilePhoneModel',
})
module.exports = {
    MobilePhoneModel
}
