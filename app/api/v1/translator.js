const {Translator,MysKeyTranslate} = require('../../models/translator');
let translator = new Translator();
const {
    ConnentValidator,
    getCommentValidator
} = require('../../validators/validator')
// config the translator
translator.config = {
    from: 'zh_CHS', // zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
    to: 'pt',
    appKey: '1ab11e3dd415bc58', // https://ai.youdao.com 在有道云上进行注册
    secretKey: '4VGxkdkVKSTdQI4eicWgrHtkmzB5QxTT'
}
// 百度云翻译
const bdTranslate = new MysKeyTranslate({
    appid: "20220825001319341",  // 你的appid  去百度开发者平台查看 http://api.fanyi.baidu.com/doc/21
    secret: "FoU3LLrM8oL7iBJpu1rG", // 你的密钥
});

const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/translator'
})
/***
 * 翻译功能
 * translator
 * */
router.post('/', async (ctx) => {
    const translatorObject=JSON.parse(ctx.request.rawBody).translator;
    // let resultStr = await translator.translate(translatorObject[key])
    // translatorObject[key]=JSON.parse(resultStr).translation[0]
    let arr=[[]]
    let keyArr=[[]]
    let i=0,j=0;
    // 百度云翻译
    for(let key in translatorObject){

        arr[j].push(translatorObject[key])
        keyArr[j].push(key)
        i++;
        if(i==50){
            i=0;
            j++;
            arr[j]=[];
            keyArr[j]=[];
        }
    }
    let resultStr=[];
    for(let item of arr){
         resultStr.push(await bdTranslate(item, { from: "zh", to: 'pt' }));
    }
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            translatorObject[keyArr[i][j]]=resultStr[i][j].dst
        }
    }
    ctx.body = {
        code:200,
        msg:'操作成功',
        data:translatorObject,
        translatorObject:JSON.parse(ctx.request.rawBody).translator
    }
})
// async function translateString(str) {
//
//     let resultStr = await translator.translate(str)
//     console.log(JSON.parse(resultStr).translation[0]);
// }
//
// translateString('你好');
module.exports = router
