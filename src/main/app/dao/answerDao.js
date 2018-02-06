
let db = require('../../resources/dbconnect');
let uuid = require('uuid')
let answerMapper = require('../../resources/mapper/answerMapper')
let answerDetailMapper = require('../../resources/mapper/answerDetailMapper')

let SqlParams = require('../../resources/SqlParams')

let answerOperate = {}
/**
 * 插入一条信息
 * @param {Number} score 总分数
 * @param {String} inquiryId 问卷id
 */
answerOperate.insertOne = (score, inquiryId, inquriyData, answerId) => {
  return new Promise((resolve, reject) => {
    let sqlparam = new SqlParams()
    // 这里生成时间
    let myDate = new Date();
    let now =  myDate.toLocaleDateString();
    sqlparam.setSql(answerMapper.insertAnswer, [answerId, '', now, score, inquiryId])
    
    inquriyData.questionData.forEach(questionItem => {
      questionItem.opationData.forEach(opationItem => {
        if (opationItem.isActive) {
          sqlparam.setSql(answerDetailMapper.insertAnswerDetail, [uuid(), answerId, opationItem.value])
        }
      })
    })
    db.transactions(sqlparam.sqlArr, resolve)
  })
}
// 根据回答id查询问卷id再查出所有回答
answerOperate.selectAllByAnswerId = answerId => {
  return new Promise((resolve, reject) => {
    try {
      db.query(answerMapper.selectAllByAnswerId, [answerId], resolve)
    } catch (error) {
      console.log(error)
    }
  })
}
// 根据回答id查询自己的信息
answerOperate.selectOneByAnswerId = answerId => {
  return new Promise((resolve, reject) => {
    db.query(answerMapper.selectOneByAnswerId, [answerId], resolve)
  })
}
module.exports = answerOperate