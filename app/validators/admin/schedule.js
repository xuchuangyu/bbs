const { LinValidator,Rule } = require('../../../core/lin-validator-v2');

class addScheduleValidator extends LinValidator {
    constructor() {
        super();
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
    }
}

module.exports = {
    addScheduleValidator,
}
