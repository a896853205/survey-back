/*
 * @Author: qc
 * @Date: 2017-12-27 14:02:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-12 23:03:02
 */
module.exports = {
  // 查询用户信息根据用户名
  getOneUserByAccount: 'select * from s_user where account = ?',
  // 插入用户信息
  insertOneUser: 'insert into s_user (id,account,password,role_id) values (?,?,?,?)',
  // 更新用户信息
  updateOneUser: 'update s_user set password = ?, name = ? where account = ?',
  // 获取所有对应权限的用户
  getAllUserByRoleId: 'select * from s_user where role_id = ?'
}