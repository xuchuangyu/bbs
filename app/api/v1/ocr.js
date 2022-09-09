

const Router = require('koa-router')
const multer = require('koa-multer')
const path = require("path")
const fs = require("fs")
const {
  APP_ID,
  API_KEY,
  SECRET_KEY,
} = require('../../config/config').baidu;

const AipOcrClient = require("baidu-aip-sdk").ocr;
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
// const {
//     User
// } = require('../../models/user')
const router = new Router({
    prefix: '/api/v1/ocr'
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
var upload = multer({ storage, fileFilter });
// 静态
router.post('/generalBasic',  upload.single('file'), async (ctx, next) => {
    var abcpath=path.join(__dirname,'../../../');
    var image = fs.readFileSync(`${abcpath}${ctx.req.file.path}`);
    var base64Img = new Buffer(image).toString('base64');
    var datas=  await  client.generalBasic(base64Img)
    ctx.body={
      success:1,
      msg:'操作成功',
      datas,
     }
})
module.exports = router
