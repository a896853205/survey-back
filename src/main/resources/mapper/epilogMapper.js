module.exports = {
  // 查询结语根据id
  getEpilogById: 'select * from b_comment where inquiry_id = ? order by begin_score',
  // 删除结语根据问卷id
  deleteEpilogByInquiryId: 'delete from b_comment where inquiry_id = ?',
  // 增加一条结语
  insertEpilog: 'insert into b_comment (id, begin_score, end_score, remark, inquiry_id) values (?, ?, ?, ?, ?)'
};
