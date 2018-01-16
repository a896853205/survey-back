/*
 * @Author: qc
 * @Date: 2018-01-03 15:24:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:36:09
 */
let jwt = require('../common/token');
let userOperate = require('../dao/userDao');
// 返回状态对象
let resultFunction = require('../common/returnObject');
/**
 * 验证token是否合法的中间件,不一致返回status:0
 * @param {Object} req 请求
 * @param {Object} res 响应
 * @param {Function} next 下一步
 */
module.exports = function(req, res, next){
  // 新建返回对象
  let result = new resultFunction();
  let token = req.headers["authorization"];
  let decoded = jwt.decodeToken(token);
  let rightFlag = true;
  // 判断token是否合法
  if(!decoded)
    rightFlag = false;
  // 判断token的时间是否合法
  if(!decoded.iat || isTimeOut(decoded.iat))
    rightFlag = false;
  let user = decoded.data;
  // 判断用户名密码是否合法
  if(user && user.account)
    userOperate.oneUserQuery(user.account).then((value)=>{
      rightFlag = (user.password === value[0].password) ? rightFlag : false;
    })
  else
    rightFlag = false;
  if(!rightFlag){
    result.errMessage = 'token不合法';
    return res.json({statusObj: result});
  }else{
    // 将user传递给下个中间件
    req.local = {
      user:user
    }
    next();
  }
}

/**
 * 判断身份是否过期
 * @param {number} oldTime 旧时光
 */
function isTimeOut(oldTime){
  let nowTime = Math.floor(Date.now() / 1000);
  // now > old 身份过期
  return (nowTime > oldTime);
}