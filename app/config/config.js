
module.exports = {
    // prod
    environment:'dev',
    database:{
        dbName:'bbs',
        host:'47.119.118.7',
        port:3306,
        user:'root',
        password:'123qweASD!@#',
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'',
        appSecret:'',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    baidu:{
        APP_ID:"19085561",
        API_KEY:"YCjjVi514zyUTuEvL50lRYTX",
        SECRET_KEY:"vhhoiZSvlYNdPOaf9KwbU0uI67anN62d",
    },
    host:'http://localhost:3000/'
}
