/*
 * @Author: qc 
 * @Date: 2018-01-19 16:07:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-31 14:21:05
 */
module.exports = {
  // 插入一条问卷
  insertInquiry: 'insert into b_inquiry (id, user_id, switch, title, create_time, end_time, description, state) values (?, ?, ?, ?, ?, ?, ?, ?)',
  // 查询一条问卷
  selectInquiry: 'select * from b_inquiry where id = ?',
  // 更新一条问卷状态
  updateInquiry: 'update b_inquiry set state = ? where id = ?',
  // 更新一条问卷的开启状态
  updateInquiryToggle: 'update b_inquiry set switch = ? where id = ?'
};