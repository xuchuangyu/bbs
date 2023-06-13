const { LinValidator,Rule } = require('../../../core/lin-validator-v2');
class addDeptsValidator extends LinValidator {
    constructor() {
        super();
        this.parentId=[
            new Rule('isLength','parentId不能为空',{ min : 1 })
        ]
        this.sort=[
            new Rule('isLength','sort不能为空',{ min : 1 })
        ]
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
    }
}
class putDeptsValidator extends  addDeptsValidator{
    constructor() {
        super();
        this.id=[
            new Rule('isLength','id不能为空',{min:1})
        ]
    }
}
module.exports ={
    addDeptsValidator,
    putDeptsValidator
}
