/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 21:45:33
 */
let questionMapper = require('../../resources/mapper/questionMapper')
let db = require('../../resources/dbconnect');
let questionOperate = {};
/**
 * 查询一个问题
 */
questionOperate.selectOne = id => {
  return new Promise((resolve, reject) => {
    db.query(questionMapper.selectQuestion, [id], resolve)
  })
}
module.exports = questionOperate;