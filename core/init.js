const requireDirectory = require('require-directory')
var http = require('http');
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.initSocket();
        InitManager.loadConfig()
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/app/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        function whenLoadModule(obj) {

            if (obj instanceof Router) {
                InitManager.app.use(obj.routes(), obj.allowedMethods())
            }
        }
    }
    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
    static initSocket(server) {
        var io = require('socket.io')(server);
        //     var onlieCount = 0;
        io.on('connection', function (socket) {
            //  onlieCount++;
            //   console.log('有一个人进来了,' + '现在有' + onlieCount + '人在线！');
            console.log('socket 初始化')
            socket.on('login', function (obj) {
                // console.log(obj.username);
                // 发送数据
                socket.emit('relogin', {
                    msg: `你好${obj.username}`,
                    code: 200
                });
            });
        });
    }
}
module.exports = InitManager