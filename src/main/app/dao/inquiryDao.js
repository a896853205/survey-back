/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-12 21:46:07
 */

let inquiryMapper = require('../../resources/mapper/inquiryMapper')
let questionMapper = require('../../resources/mapper/questionMapper')
let opationMapper = require('../../resources/mapper/opationMapper')
let epilogMapper = require('../../resources/mapper/epilogMapper')
let uuidin = require('uuid')
let db = require('../../resources/dbconnect')
let SqlParams = require('../../resources/SqlParams')
let inquiryOperate = {}
/**
 * 插入一条问卷
 * @param {String} uuid 问卷的uuid
 * @param {String} user_id 用户id
 * @param {String} title 题目
 * @param {String} description 问卷描述
 * @param {String} state 问卷状态
 */
inquiryOperate.insertOne = (uuid, user_id, title, description, state) => {
  return new Promise((resolve, reject) => {
    // 这里生成时间
    let myDate = new Date()
    let now =  myDate.toLocaleDateString()
    // 默认100年后失效
    myDate.setDate(myDate.getDate() + 365 * 100)
    let end = myDate.toLocaleDateString()
    let sqlparam = new SqlParams()
    sqlparam.setSql(inquiryMapper.insertInquiry, [uuid, user_id, 0, title, now, end, description, state])
    // 插入题目
    let question1Uuid = uuidin()
    let question2Uuid = uuidin()
    sqlparam.setSql(questionMapper.insertQuestion, [question1Uuid, uuid, 1, 1, '新建问题', ''])
    sqlparam.setSql(questionMapper.insertQuestion, [question2Uuid, uuid, 2, 1, '新建问题', ''])
    // 插入选项
    sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question1Uuid, '新建选项1', 0])
    sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question1Uuid, '新建选项2', 0])
    sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question2Uuid, '新建选项1', 0])
    sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question2Uuid, '新建选项2', 0])
    // 开始事务,fn为成功回调函数
    db.transactions(sqlparam.sqlArr, resolve)
  })
}
/**
 * 查询一个问卷
 */
inquiryOperate.selectOne = id => {
  return new Promise((resolve, reject) => {
    db.query(inquiryMapper.selectInquiry, [id], resolve)
  })
}
/**
 * 更新问卷整体
 */
inquiryOperate.updateAll = (inquiryInfo, inquiryStep, questionArr, opationArr, fn) => {
  let sqlparam = new SqlParams()
  // 先全部清除
  questionArr.forEach(questionItem => {
    sqlparam.setSql(opationMapper.deleteSomeOpations, [questionItem.id])
    // 然后删除这个问题
    sqlparam.setSql(questionMapper.deleteQuestion, [questionItem.id])
  })
  // 然后再全部插入
  try {
    inquiryInfo.questionData.forEach((questionItem, index) => {
      let questionUuid = uuidin()
      sqlparam.setSql(questionMapper.insertQuestion, [questionUuid, inquiryInfo.id, index + 1, 1, questionItem.name, ''])
      questionItem.opationData.forEach(opationItem => {
        sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', questionUuid, opationItem.name, opationItem.score])
      })
    })
  } catch (e) {
    console.log(e)
  }
  // 在这里修改问卷的状态为2
  sqlparam.setSql(inquiryMapper.updateInquiry, [inquiryStep, inquiryInfo.id])
  db.transactions(sqlparam.sqlArr, fn)
}
inquiryOperate.updateToggle = (inquiryId, inquirySwitch) => {
  return new Promise((resolve, reject) => {
    db.query(inquiryMapper.updateInquiryToggle, [inquirySwitch, inquiryId], resolve)
  })
}
/**
 * 根据回答id查询出问卷信息
 * @param {String} answerId 回答id
 */
inquiryOperate.selectInquiryByAnswerId = answerId => {
  return new Promise((resolve, reject) => {
    db.query(inquiryMapper.selectInquiryByAnswerId, [answerId], resolve)
  })
}
/**
 * 通过用户的id查询所有的问卷
 * @param {String} user_id 用户的id
 */
inquiryOperate.selectAllInquiryByUserId = user_id => {
  return new Promise((resolve, reject) => {
    db.query(inquiryMapper.selectAllInquiryByUserId, [user_id], resolve)
  })
}
// 删除一个问卷的所有
inquiryOperate.deleteInquiry = (inquiryId, questionArr, fn) => {
  let sqlparam = new SqlParams()
  // 先全部清除
  questionArr.forEach(questionItem => {
    sqlparam.setSql(opationMapper.deleteSomeOpations, [questionItem.id])
    // 然后删除这个问题
    sqlparam.setSql(questionMapper.deleteQuestion, [questionItem.id])
  })
  // 还得删除结语回答-------------------------------
  sqlparam.setSql(epilogMapper.deleteEpilogByInquiryId, [inquiryId])
  sqlparam.setSql(inquiryMapper.deleteInquiry, [inquiryId])
  db.transactions(sqlparam.sqlArr, fn)
}
// 查询所有问卷
inquiryOperate.selectAllInquiry = () => {
  return new Promise((resolve, reject) => {
    db.query(inquiryMapper.selectAllInquiry, [], resolve)
  })
}
module.exports = inquiryOperate;