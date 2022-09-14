const { LinValidator,Rule } = require('../../core/lin-validator-v2');

class addMenuValidator extends LinValidator {
    constructor() {
        super();
        this.title=[
            new Rule('isLength','title不能为空',{ min : 1 })
        ]
        this.path=[
            new Rule('isLength','path不能为空',{min:1})
        ]
    }
}
class addAuthorityValidator extends LinValidator {
    constructor() {
        super();
        this.name=[
            new Rule('isLength','name不能为空',{min:1})
        ]
        this.code=[
            new Rule('isLength','code不能为空',{min:1})
        ]
        this.type=[
            new Rule('isLength','type不能为空',{min:1})
        ]
    }
}
class editAuthorityValidator extends LinValidator {
    constructor() {
        super();
        this.id=[
            new Rule('isLength','id不能为空',{min:1})
        ]
    }
}
module.exports={
    addMenuValidator,
    addAuthorityValidator,
    editAuthorityValidator
}
