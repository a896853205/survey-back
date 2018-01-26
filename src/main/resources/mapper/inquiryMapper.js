/*
 * @Author: qc 
 * @Date: 2018-01-19 16:07:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 14:26:13
 */
module.exports = {
  // 插入一条问卷
  insertInquiry: 'insert into b_inquiry (id, user_id, switch, title, create_time, end_time, description, state) values (?, ?, ?, ?, ?, ?, ?, ?)',
  // 查询一条问卷
  selectInquiry: 'select * from b_inquiry where id = ?'
};