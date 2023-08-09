const { LinValidator,Rule } = require('../../../core/lin-validator-v2');

class addUser extends LinValidator{
    constructor() {
        super();
        this.username=[
            new Rule('isLength','username不能为空',{ min : 1 })
        ]
        this.nickname=[
            new Rule('isLength','nickname不能为空',{ min : 1 })
        ]
    }
}

class editUser extends LinValidator{
    constructor() {
        super();
        this.username=[
            new Rule('isLength','username不能为空',{ min : 1 })
        ]
        this.nickname=[
            new Rule('isLength','nickname不能为空',{ min : 1 })
        ]

    }
}
class importUser extends LinValidator{
    constructor() {
        super();
        this.file=[
            new Rule('isLength','file不能为空',{ min : 1 })
        ]


    }
}

module.exports = {
    addUser,
    editUser,
    importUser
}
