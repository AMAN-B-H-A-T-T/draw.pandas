const Captcha = require("@haileybot/captcha-generator");


const generate_random = ()=>{
    let captcha = new Captcha();

    return captcha.value
}

module.exports = {
    generate_random
}