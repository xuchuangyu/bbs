const { LinValidator,Rule } = require('../../../core/lin-validator-v2');

class addRolesValidator extends LinValidator {
    constructor() {
        super();
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
        this.code=[
            new Rule('isLength','code不能为空',{ min : 1 })
        ]
        this.dataScope=[
            new Rule('isLength','dataScope不能为空',{ min : 1 })
        ]
        this.sort=[
            new Rule('isLength','sort不能为空',{ min : 1 })
        ]
        this.status=[
            new Rule('isLength','status不能为空',{ min : 1 })
        ]
    }
}

module.exports = {
    addRolesValidator,
}
