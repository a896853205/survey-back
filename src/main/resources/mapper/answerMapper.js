module.exports = {
  // 插入回答
  insertAnswer: 'insert into b_answer (id, duration, dt, score, inquiry_id) values (?, ?, ?, ?, ?)',
  // 根据回答id,查询问卷id,再查询出所有这个问卷id的回答.
  selectAllByAnswerId: 'select * from b_answer where inquiry_id in (select inquiry_id from b_answer where id = ?)',
  // 根据id查询单条信息
  selectOneByAnswerId: 'select * from b_answer where id = ?'
}
