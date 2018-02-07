/*
 * @Author: qc
 * @Date: 2018-01-29 13:43:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-07 11:44:30
 */

let epilogMapper = require('../../resources/mapper/epilogMapper')
let inquiryMapper = require('../../resources/mapper/inquiryMapper');
let db = require('../../resources/dbconnect');
let uuid = require('uuid')
let SqlParams = require('../../resources/SqlParams')
let epilogOperate = {};

/**
 * 查询一个问卷的评语(根据问卷id)
 */
epilogOperate.getEpilogById = id => {
  return new Promise((resolve, reject) => {
    db.query(epilogMapper.getEpilogById, [id], resolve)
  })
}
epilogOperate.getEpilogByAnswerId = answerId => {
  return new Promise((resolve, reject) => {
    try {
      db.query(epilogMapper.getEpilogByAnswerId, [answerId], resolve)
    } catch (error) {
      console.log(error)
    }
  })
}
/**
 * 保存一个问卷的评语
 */ 
epilogOperate.saveEpilog = (inquiryId, inquiryStep, epilogArr, fn) => {
  let sqlparam = new SqlParams()
  // 先删除
  sqlparam.setSql(epilogMapper.deleteEpilogByInquiryId, [inquiryId])
  epilogArr.forEach(item => {
    // 再增加
    sqlparam.setSql(epilogMapper.insertEpilog, [uuid(), item.minScore, item.maxScore, item.remark, inquiryId])
  })
  try {
    sqlparam.setSql(inquiryMapper.updateInquiry, [inquiryStep, inquiryId])
    db.transactions(sqlparam.sqlArr, fn)
  } catch (error) {
    console.log(error)
  }
}
module.exports = epilogOperate;