const { LinValidator,Rule } = require('../../../core/lin-validator-v2');

class addMenuValidator extends LinValidator {
    constructor() {
        super();
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]

    }
}
class editMenuValadator extends LinValidator {
    constructor() {
        super();
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
    }
}
module.exports = {
    addMenuValidator,
    editMenuValadator
}
