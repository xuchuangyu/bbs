const { createCanvas } = require('canvas');

function getRandomColor(){
    const r=Math.floor(Math.random()*255);
    const g=Math.floor(Math.random()*255);
    const b=Math.floor(Math.random()*255);
    return `rgba(${r},${g},${b},1)`;
}
 function generateArithmeticCaptcha(){
    const num1= Math.floor(Math.random()*90)+10;
    const num2= Math.floor(Math.random()*90)+10;

    const sum = num1 + num2;

    // 使用canvas创建一个画布
    const canvas = createCanvas(120,36)
    const ctx = canvas.getContext('2d');
    ctx.fillStyle='#fff';
    ctx.fillRect(0,0,120,36);
    // 绘制算式文本
    ctx.fillStyle=getRandomColor()
    ctx.font='20px Arial';
    ctx.fillText(`${num1}+${num2} = ?`,10 ,25);
    const captchaBase64 = canvas.toDataURL();
    return {
        equation: `${num1} + ${num2} = ?`,
        captchaBase64: captchaBase64,
        answerHash: sum.toString()
    }
}

module.exports = {
    generateArithmeticCaptcha
}
