const { LinValidator,Rule } = require('../../../core/lin-validator-v2');


class postAuthLogin extends LinValidator {
    constructor() {
        super();
        this.username=[
            new Rule('isLength','username不能为空',{ min : 1 })
        ]
        this.password=[
            new Rule('isLength','password不能为空',{ min : 1 })
        ]
        this.uuid=[
            new Rule('isLength','uuid不能为空',{ min : 1 })
        ]
        this.code=[
            new Rule('isLength','code不能为空',{ min : 1 })
        ]
    }
}

module.exports={
    postAuthLogin
}
