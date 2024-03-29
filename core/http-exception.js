class HttpException extends Error{
    constructor(msg='服务器异常',errorCode=10000,code=400){
        super()
        this.errorCode = errorCode
        this.code =code
        this.msg = msg
    }
}

class Success extends HttpException {
    constructor(msg,errorCode){
        super()
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 200
        this.code=200;
    }
}

class NotFound extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed  extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}
class Forbbiden extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

class ParameterException extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}
class AboutUsException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '内容已被创建，不能重复创建'
        this.errorCode = errorCode || 10000
    }
}
class uploadException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '上传文件出错'
        this.errorCode = errorCode || 10000
    }
}
module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AboutUsException,
    uploadException,
    AuthFailed,
    Forbbiden,
    Success
}
