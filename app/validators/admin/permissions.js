const { LinValidator,Rule } = require('../../../core/lin-validator-v2');
class addPermissionsValidator extends LinValidator {
    constructor() {
        super();
        this.menuId=[
            new Rule('isLength','menuId不能为空',{ min : 1 })
        ]
        this.name=[
            new Rule('isLength','name不能为空',{min:1})
        ]
    }
}
module.exports = {
    addPermissionsValidator
}
