/*
 * @Author:qc
 * @Date: 2018-01-03 15:24:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-11 19:50:06
 */
let roleDao = require('../dao/roleDao');
// 返回状态对象
let resultFunction = require('../common/returnObject');
/**
 * 查看权限中间件
 * @param {*请求} req
 * @param {*响应} res
 * @param {*下一步} next
 */
module.exports = (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  let role = getRoleUrl(req.baseUrl,req.originalUrl);
  if(req.local.user.role_id){
    roleDao.getOneRoleById(req.local.user.role_id).then((value)=>{
      if(value[0].name === role){
        next();
      } else {
        result.errMessage = 'token解析错误(权限)';
        return res.json(result);
      }
    });
  } else {
    result.errMessage = 'token解析错误(权限)';
    return res.json(result);
  }
}
/**
 * 获取权限路径
 * @param {*基本路径} baseUrl 
 * @param {*额外路径} originalUrl 
 */
function getRoleUrl(baseUrl, originalUrl){
  return originalUrl.slice(baseUrl.length).split('/')[1];
}