function success(msg,errorCode){
   console.log(global.errs.Success)
    throw new global.errs.Success(msg, errorCode)
}

module.exports = {
    success
}

