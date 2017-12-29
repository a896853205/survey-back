let jwt = require('../custom/token');
let userOperate = require('../dao/userDao');
/**
 * 验证token是否合法的中间件,不一致返回status:0
 * @param {*请求} req 
 * @param {*响应} res 
 * @param {*下一步} next 
 */
module.exports = function(req, res, next){
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
  if(!rightFlag)
    return res.json({
      status:0
    });
  next();
}

/**
 * 判断身份是否过期
 * @param {*} oldTime 
 */
function isTimeOut(oldTime){
  let nowTime = Math.floor(Date.now() / 1000);
  // now > old 身份过期
  return (nowTime > oldTime);
}