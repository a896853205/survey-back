/*
 * @Author:qc
 * @Date: 2018-01-03 15:24:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:45:33
 */
let roleDao = require('../dao/roleDao');
// 返回状态对象
let resultFunction = require('../common/returnObject');
/**
 * 查看权限中间件
 * @param {Object} req 请求
 * @param {Object} res 响应
 * @param {Function} next 下一步
 */
module.exports = (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  let role = getRoleUrl(req.baseUrl,req.originalUrl);
  // 全部权限都可以的
  if(role === 'all')
    next();
  if(req.local.user.role_id){
    roleDao.getOneRoleById(req.local.user.role_id).then((value)=>{
      if(value[0].name === role){
        next();
      } else {
        result.errMessage = 'token解析错误(权限)';
        return res.json({statusObj: result});
      }
    });
  } else {
    result.errMessage = 'token解析错误(权限)';
    return res.json({statusObj: result});
  }
}
/**
 * 获取权限路径
 * @param {String} baseUrl 基本路径
 * @param {String} originalUrl 额外路径
 */
function getRoleUrl(baseUrl, originalUrl){
  return originalUrl.slice(baseUrl.length).split('/')[1];
}