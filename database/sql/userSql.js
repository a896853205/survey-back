/*
 * @Author: qc
 * @Date: 2017-12-27 14:02:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-27 15:59:15
 */
const userSql = {};
/**
 * 查询用户信息根据用户名
 * @param {*用户名} account 
 */
userSql.getOneUserByAccount = function(account){
  return `select * from s_user where account = ${account}`;
}

module.exports = userSql;