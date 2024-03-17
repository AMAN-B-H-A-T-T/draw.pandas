const Captcha = require("@haileybot/captcha-generator");


const generate_randowm = ()=>{
    let captcha = new Captcha();
    return captcha.value
}

module.exports = {
    generate_randowm
}