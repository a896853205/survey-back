module.exports = {
  // 查询权限根据id
  insertOpation: 'insert into b_opation (id, symbol, question_id, content, score) values (?, ?, ?, ?, ?)',
  // 查询出某题的所有选项
  selectSomeOpations: 'select * from b_opation where question_id = ?'
};
