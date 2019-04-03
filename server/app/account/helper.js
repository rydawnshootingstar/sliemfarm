const SHA256 = require('crypto-js/sha256');
const { APP_SECRET } = require('../../secrets/crypto');

//256 function returns a complex object. we just want to turn it into a string
const hash = (strang)=> {
    return SHA256(`${APP_SECRET}${strang}${APP_SECRET}`).toString();
}

module.exports = { hash };