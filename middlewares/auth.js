const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8;// 普通用户
        Auth.ADMIN = 16; // 管理员
        Auth.SUPER_ADMIN = 32  // 超级管理员
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            if(!userToken){
                throw new global.errs.Forbbiden(errMsg)
            }
            try{
                var decode= jwt.verify(userToken.name,global.config.security.secretKey)
            }catch (error){
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }
            if(decode.scope<this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }
            ctx.auth = {
                uid:decode.uid,
                scope:decode.scope,
            }
            await next()
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}
