/*
 * @Author: qc 
 * @Date: 2018-01-19 16:07:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-19 16:10:53
 */
module.exports = {
  // 插入一条问卷
  insertInquiry: 'insert into b_inquiry (id, user_id, switch, title, create_time, end_time, description, state) values (?, ?, ?, ?, ?, ?, ?, ?)'
};