const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
    static initCore(app){
        InitManager.app=app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig()
    }

    static loadConfig(path = ''){
        const configPath=path || process.cwd() + '/app/config/config.js'
        const config = require(configPath)
        global.config=config
    }
    static initLoadRouters(){
        const apiDirectory= `${process.cwd()}/app/api`
        requireDirectory(module,apiDirectory,{
            visit:whenLoadModule
        })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes(),obj.allowedMethods())
            }
        }
    }
    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs=errors
    }
}
module.exports=InitManager