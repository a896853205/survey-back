module.exports = {
  // 插入一条问题
  insertQuestion: 'insert into b_question (id, inquiry_id, num, type_id, content, essential) values (?, ?, ?, ?, ?, ?)',
  // 查询一条问题
  selectQuestion: 'select * from b_question where inquiry_id = ? order by num'
};
