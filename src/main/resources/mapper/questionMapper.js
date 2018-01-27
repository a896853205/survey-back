module.exports = {
  // 插入一条问题
  insertQuestion: 'insert into b_question (id, inquiry_id, num, type_id, content, essential) values (?, ?, ?, ?, ?, ?)',
  // 查询一整个问卷的问题
  selectQuestion: 'select * from b_question where inquiry_id = ? order by num desc',
  // 查询一条问题
  selectOneQuestion: 'select * from b_question where id = ?',
  // 删除一条问题
  deleteQuestion: 'delete from b_question where id = ?',
  // 调整问题序号
  updateQuestionNum: 'update b_question set num = ? where id = ?'
};
