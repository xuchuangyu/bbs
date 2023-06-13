const { LinValidator,Rule } = require('../../../core/lin-validator-v2');
class addDictTypesValidator extends LinValidator {
    constructor() {
        super();
        this.code=[
            new Rule('isLength','code不能为空',{ min : 1 })
        ]
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
    }
}
class putDictTypesValidator extends addDictTypesValidator {
    constructor() {
        super();
        this.id=[
            new Rule('isLength','id不能为空',{ min : 1 })
        ]
    }
}
class addDictItemsValidator extends LinValidator {
    constructor() {
        super();
        this.typeCode=[
            new Rule('isLength','typeCode不能为空',{ min : 1 })
        ]
        this.name=[
            new Rule('isLength','name不能为空',{ min : 1 })
        ]
        this.value=[
            new Rule('isLength','value不能为空',{ min : 1 })
        ]
    }
}
class putDictItemsValidator extends addDictTypesValidator {
    constructor() {
        super();
        this.id=[
            new Rule('isLength','id不能为空',{ min : 1 })
        ]
    }
}
module.exports ={
    addDictTypesValidator,
    putDictTypesValidator,
    addDictItemsValidator,
    putDictItemsValidator
}
