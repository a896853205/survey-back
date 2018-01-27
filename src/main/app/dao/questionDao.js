/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-27 17:09:03
 */
let questionMapper = require('../../resources/mapper/questionMapper')
let opationMapper = require('../../resources/mapper/opationMapper')
let SqlParams = require('../../resources/SqlParams')
let db = require('../../resources/dbconnect');
let uuid = require('uuid')
let questionOperate = {};
/**
 * 查询一个问卷的问题
 */
questionOperate.selectOne = id => {
  return new Promise((resolve, reject) => {
    db.query(questionMapper.selectQuestion, [id], resolve)
  })
}
/**
 * 查询一个问题
 */
questionOperate.selectOneOnlyQuestion = id => {
  return new Promise((resolve, reject) => {
    db.query(questionMapper.selectOneQuestion, [id], resolve)
  })
}
/**
 * 增加一个新问题
 */
questionOperate.addQuestion = (inquiryId, questionNum, questionUuid, fn) => {
  let sqlparam = new SqlParams()
  sqlparam.setSql(questionMapper.insertQuestion, [questionUuid, inquiryId, questionNum, 1, '新建问题', ''])
  sqlparam.setSql(opationMapper.insertOpation, [uuid(), '', questionUuid, '新建选项1', 0])
  sqlparam.setSql(opationMapper.insertOpation, [uuid(), '', questionUuid, '新建选项2', 0])
  db.transactions(sqlparam.sqlArr, fn)
}
/**
 * 删除一个问题
 */
 questionOperate.deleteQuestion = (id, fn) => {
  let sqlparam = new SqlParams()
  sqlparam.setSql(questionMapper.deleteQuestion, [id])
  sqlparam.setSql(opationMapper.deleteSomeOpations, [id])
  db.transactions(sqlparam.sqlArr, fn)
 }
 /**
  * 调整问卷序号
  */
questionOperate.updateQuestionNum = (parArr, fn) => {
  if (parArr.length === 0) {
    return fn()
  }
  let sqlparam = new SqlParams()
  parArr.forEach(item => {
    sqlparam.setSql(questionMapper.updateQuestionNum, [item.num, item.id])
  })
  db.transactions(sqlparam.sqlArr, fn)
}
/**
 * 插入一条问题
 */
questionOperate.insertOneQuestion = (questionData, opationData) => {
  // questionData为问卷信息, opationData为选项数组信息
}
module.exports = questionOperate;