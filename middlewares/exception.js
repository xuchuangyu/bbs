const {HttpException} = require("../core/http-exception")

const catchError = async (ctx,next)=>{
    try{
        await next()
    }catch(error){
        // 开发环境
        // 生产环境
        // 开发环境 不是HttpException
        const isHttpException =error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if(isDev && !isHttpException){
            throw error
        }
        if(isHttpException){
            ctx.body = {
                msg : error.msg,
                code : error.errorCode,
                request : `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg : 'we made a mistake O(∩_∩)O~~',
                code:999,
                request : `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
