
const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')
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
    ArticleTitleValidator,

    ConnentValidator,
    DelIdValidator,
    TodoListValidator,
    AboutUsValidator,
    getCommentValidator,
    PositiveIntegerValidator
}
