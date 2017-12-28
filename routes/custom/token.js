/*
 * @Author: qc 
 * @Date: 2017-12-28 23:12:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-29 00:12:33
 */
let jwt = require('jsonwebtoken');
let webToken = {};
// 生成token配置项
let opation = {
  duration:Math.floor(Date.now() / 1000) - 60*60*2, // 持续两小时有效
  secret:'secret', //加密字符串
};
/**
 * 给定加密对象生成对应token
 * @param {*想加密的对象} obj 
 */
webToken.getToken = function (obj){
  return jwt.sign({
      foo:obj,
      iat:opation.duration
    },opation.secret);
}
/**
 * 给token解密
 * @param {*要解密的token} token 
 */
webToken.decodeToken = function (token){
  return new Promise((resolve,reject)=>{
    jwt.verify(token,opation.secret,resolve);
  });
}
module.exports = webToken;