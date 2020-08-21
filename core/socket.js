const { request } = require('../app');

const { Chat } = require('../app/models/chat.js')

class Socket {
    static init(server) {
        // Socket.io== require('socket.io')(server);
        var io = require('socket.io')(server);
        //     var onlieCount = 0;
        var userList = {};
        var msgList = [];
        io.on('connection', function (socket) {
            socket.on('login', function (obj) {
                socket.join('123456', function () {
                    // console.log('rooms:' + JSON.stringify(socket.rooms)); // [ <socket.id>, 'room 237' ]
                })
                if (!userList[obj.id]) {
                    userList[obj.id] = obj
                    userList[obj.id].userSocketId = [socket.id]
                    let params = {
                        nickname: obj.nickname,
                        time: new Date().getTime(),
                        type: 2
                    };
                    if (!userList[obj.id].enter) {
                        msgList.push(params)
                        io.to('123456').emit('reSendMsg', params);
                    }
                    userList[obj.id].enter = true;
                } else {
                    userList[obj.id].userSocketId.push(socket.id)
                }
                socket.emit('initMsg', msgList)
                io.to('123456').emit('reLogin', {
                    userList,
                    code: 200
                });
            });
            socket.on("sendMsg", function (datas) {
                msgList.push(datas)
                io.to('123456').emit('reSendMsg', datas);
            })
            socket.on('disconnect', function () {
                for (let key in userList) {
                    for (let item of userList[key].userSocketId) {
                        if (item == socket.id) {
                            const index = userList[key].userSocketId.indexOf(item);
                            if (userList[key].userSocketId.length > 1 && index > -1) {
                                userList[key].userSocketId.splice(index, 1);
                            } else {
                                let params = {
                                    nickname: userList[key].nickname,
                                    time: new Date().getTime(),
                                    type: 3
                                };
                                msgList.push(params)
                                io.to('123456').emit('reSendMsg', params);
                                delete userList[key];
                            }
                            io.to('123456').emit('loginOut', {
                                userList: userList,
                                code: 200
                            })
                        }
                    }
                }
            })
            //加入分组
            socket.on('joinGroup', function (data) {
                socket.join(data.group, function () {
                    console.log('rooms:' + JSON.stringify(socket.rooms)); // [ <socket.id>, 'room 237' ]
                    io.to(socket.id).emit('clientGetSocketId', {
                        socketId: socket.id
                    })
                });
            });
            socket.on('serverEventMessage', function (data) {
                var room = data.group;//发送消息客户端所在分组

                io.to(socket.id).emit('clientEventMessage', {
                    msg: 'socket.id发送'
                });

                io.to(room).emit('clientEventMessage', {
                    msg: 'room 发送'
                });
            });

        });

    }
}
module.exports = Socket