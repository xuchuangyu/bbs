const request = require('request-promise')
var crypto = require('crypto');
const md5 = require("md5-node");
const axios = require("axios");

/**
 * 翻译器
 */
function Translator() {
    this.config = {
        from: '',
        to: '',
        appKey: '',
        secretKey: '',
    }
}

/**
 * md5加密
 */
Translator.prototype.md5 = function md5(str) {
    var crypto_md5 = crypto.createHash("md5");
    crypto_md5.update(str);
    return crypto_md5.digest('hex');
}

/**
 * 生成[0,n]区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
 */
Translator.prototype.getRandomN = function getRandomN(roundTo) {
    return Math.round(Math.random() * roundTo);
}

/**
 * {a:'111',b:'222'} => a=111&b=222
 */
Translator.prototype.generateUrlParams = function generateUrlParams(_params) {
    const paramsData = [];
    for (const key in _params) {
        if (_params.hasOwnProperty(key)) {
            paramsData.push(key + '=' + _params[key]);
        }
    }
    const result = paramsData.join('&');
    return result;
}

/**
 * 进行翻译
 */
Translator.prototype.translate = async function (word) {
    let youdaoHost = 'http://openapi.youdao.com/api';
    // 在get请求中，中文需要进行uri编码
    let encodeURIWord = encodeURI(word);
    let salt = this.getRandomN(1000);
    let sign = this.md5(this.config.appKey + word + salt + this.config.secretKey);
    let paramsJson = {
        q: encodeURIWord,
        from: this.config.from,
        to: this.config.to,
        appKey: this.config.appKey,
        salt: salt,
        sign: sign
    }
    // let url = `http://openapi.youdao.com/api?q=${encodeURI(q)}&from=${from}&to=${to}&appKey=${appKey}&salt=${salt}&sign=${sign}`;
    let url = youdaoHost + '?' + this.generateUrlParams(paramsJson);
    let result = await request.get({ url: url });
    return result;
}
function MysKeyTranslate(config) {
    this.requestNumber = 0;
    this.config = {
        showProgress: true,
        requestNumber: 1,
        agreement: 'http',
        ...config,
    };
    this.baiduApi = `${this.config.agreement}://api.fanyi.baidu.com/api/trans/vip/translate`

    this.createUrl = (domain, form) => {
        let result = domain + "?";
        for (let key in form) {
            result += `${key}=${form[key]}&`;
        }
        return result.slice(0, result.length - 1);
    };

    this.requestApi = (value, parames) => {
        if (this.requestNumber >= this.config.requestNumber) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.requestApi(value, parames).then((res) => {
                        resolve(res);
                    });
                }, 1000);
            });
        }
        this.requestNumber++;
        const { appid, secret } = this.config;
        const q = value;
        const salt = Math.random();
        const sign = md5(`${appid}${q}${salt}${secret}`);
        const fromData = {
            ...parames,
            q: encodeURIComponent(q),
            sign,
            appid,
            salt,
        };
        const fanyiApi = this.createUrl(this.baiduApi, fromData);
        // console.log("fanyiApi", fanyiApi);
        return new Promise((resolve) => {
            axios
                .get(fanyiApi)
                .then(({ data: res }) => {
                    if (this.config.showProgress) console.log("翻译结果：", JSON.stringify(res));

                    if (!res.error_code) {
                        const resList = res.trans_result;
                        resolve(resList);
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        this.requestNumber--;
                    }, 1000);
                });
        });
    };

    this.translate = async (value, parames = { from: "zh", to: "en" }) => {
        let result = "";
        if (typeof value === "string") {
            const res = await this.requestApi(value, parames);
            result = res.trans_result[0]["dst"];
        }
        if (
            Array.isArray(value) ||
            Object.prototype.toString.call(value) === "[object Object]"
        ) {
            result = await this._createObjValue(value, parames);
        }
        return result;
    };

    this._createObjValue = async (value, parames) => {
        let index = 0;
        const obj = Array.isArray(value) ? [] : {};
        const strDatas = Array.isArray(value) ? value : Object.values(value);
        const reqData = strDatas
            .filter((item) => typeof item === "string")
            .join("\n");
        const res = reqData ? await this.requestApi(reqData, parames) : [];
        console.log(res)
        // for (let key in value) {
        //     if (typeof value[key] === "string") {
        //         console.log(111)
        //         obj[key] = JSON.parse(res).trans_result
        //         index++;
        //     }
        //     if (
        //         Array.isArray(value[key]) ||
        //         Object.prototype.toString.call(value[key]) === "[object Object]"
        //     ) {
        //         obj[key] = await this.translate(value[key], parames);
        //     }
        // }
        return res;
    };

    return this.translate;
}

// export default MysKeyTranslate;
// export const Translator;
module.exports = {
    Translator,
    MysKeyTranslate

};
