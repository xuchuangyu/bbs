function isThisType(val){
    for(let key in this){
        if(this[key] == val){
            return true
        }
    }
    return false
}
/**
 *  登录方式
 *  101 邮箱登录
 *  102 手机号码登录
 *  103 账号登录
 *  200 管理员邮箱登录
 * */
const LoginType = {
    USER_MINI_PROGRAM:100,
    USER_EMAIL:101,
    USER_MOBILE:102,
    USER_ACCOUNT:103,
    ADMIN_EMAIL:200,
    isThisType
}
module.exports = {
    LoginType
}
