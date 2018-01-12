/*
 * @Author: qc
 * @Date: 2017-12-27 14:02:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-12 17:13:48
 */
module.exports = {
  // 查询用户信息根据用户名
  getOneUserByAccount: 'select * from s_user where account = ?',
  // 插入用户信息
  insertOneUser: 'insert into s_user (id,account,password,role_id) values (?,?,?,?)'
};