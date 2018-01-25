/*
 * @Author: qc 
 * @Date: 2017-12-28 23:12:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-25 22:23:39
 */
let jwt = require('jsonwebtoken');
let webToken = {};
// 生成token配置项
let opation = {
  secret: 'secret' //加密字符串
};
class Opation {
  constructor () {
    this.duration = Math.floor(Date.now() / 1000) + 60 * 60 * 2
    this.secret = 'secret'
  }
}
/**
 * 给定加密对象生成对应token
 * @param {Object} obj 想加密的对象
 */
webToken.getToken = function (obj){
  let opation = new Opation()
  return jwt.sign({
      data: obj,
      iat: opation.duration
    }, opation.secret);
}
/**
 * 给token解密
 * @param {String} token 要解密的token
 */
webToken.decodeToken = function (token){
  try{
    return jwt.verify(token,opation.secret);
  } catch(err) {
    return 0;
  }
}
/**
 * 直接获取到data的方法
 * @param {String} token 要解析的token
 */
webToken.decodeDataToken = function (token){
  try{
    // @ts-ignore
    return jwt.verify(token,opation.secret).data;
  } catch(err) {
    return 0;
  }
}
module.exports = webToken;