
const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')
const {
    LoginType
} = require('../lib/enum')
const {
    User
} = require('../models/user')
class NavValidator extends LinValidator {
    constructor() {
        super()
        this.name = [
            new Rule('isLength', '导航名称不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.url = [
            new Rule('isLength', '导航链接不能为空', {
                min: 1,
            })
        ]
    }
}
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        // this.email=[
        //     new Rule(`isEmail`,'不符合Emil规范')
        // ]
        // this.password1=[
        //     new Rule(`isLength`,`密码至少6个字符，最多32个字符`,{
        //         min:6,
        //         max:32
        //     }),
        //     new Rule(`matches`,`密码不符合规范`,`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]`)
        // ]
        // this.password2=this.password1
        // this.nickname=[
        //     new Rule('isLength',`昵称不符合长度规范`,{
        //         min:4,
        //         max:32
        //     })
        // ]
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}

class ConnentValidator extends LinValidator{
    constructor(){
        super()
        this.content=[
            new Rule('isLength', 'content 不能为空', {
                min: 1,
            })
        ]
    }
}
class getCommentValidator extends LinValidator{
    constructor(){
        super()
        this.articleId=[
            new Rule('isLength', 'articleId 不能为空', {
                min: 1,
            })
        ]
    }
}
class TokenValidator extends LinValidator{
    constructor(){
        super()
        this.account = [
            new Rule(`isLength`,`不符合账号规则`,{
                min:4,
                max:32
            })
        ]
        this.secret=[
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符',{
                min:6,
                max:128
            })
        ]
    }
    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必须的参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}

class AboutUsValidator extends LinValidator {
    constructor() {
        super()
        this.name = [
            new Rule('isLength', '导航名称不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.pic = [
            new Rule('isLength', '头像不能为空', {
                min: 1,
            })
        ]
        this.introduction = [
            new Rule('isLength', '简介不能为空', {
                min: 1,
            })
        ]
        this.qq = [
            new Rule('isLength', 'QQ不能为空', {
                min: 1,
            })
        ]
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
    }
}
class DelIdValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule('isInt', 'id 需要是正整数', {
                min: 1
            }),
        ]
    }
}
class TodoListValidator extends LinValidator{
    constructor(){
        super()
        this.title = [
            new Rule('isLength', '内容不能为空', {
                min: 1,
            })
        ]
    }
}
class ArticleValidator extends LinValidator{
    constructor(){
        super()
        this.title = [
            new Rule('isLength', '标题不能为空', {
                min: 1,
            })
        ]
        this.content = [
            new Rule('isLength', '内容不能为空', {
                min: 1,
            })
        ]
    }
}
class ArticleTitleValidator extends LinValidator{
    constructor(){
        super()
    }
}
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            }),
        ]
    }
}
module.exports = {
    NavValidator,
    ArticleValidator,
    RegisterValidator,
    TokenValidator,
    ConnentValidator,
    DelIdValidator,
    TodoListValidator,
    AboutUsValidator,
    getCommentValidator,
    PositiveIntegerValidator
}