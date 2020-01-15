
// const {} =require('@validators')
const Router = require('koa-router')
const multer = require('koa-multer')
const router = new Router({
    prefix: '/v1'
})
//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
const fileFilter = function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'jpg' || fileType == 'png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}
var upload = multer({ storage, fileFilter });
router.post('/upload', upload.single('file'), async (ctx, next) => {
    if (!ctx.req.file) {
        throw new global.errs.uploadException
    }
    ctx.body =[{
        url: 'http://localhost:3000/uploads/' + ctx.req.file.filename,//返回文件名
        thumb:'http://localhost:3000/uploads/' + ctx.req.file.filename,//返回文件名
        tag: 'flower'
    }] 
})
module.exports = router
