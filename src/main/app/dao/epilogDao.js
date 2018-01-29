/*
 * @Author: qc
 * @Date: 2018-01-29 13:43:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-29 16:06:22
 */

let epilogMapper = require('../../resources/mapper/epilogMapper')
let db = require('../../resources/dbconnect');
let uuid = require('uuid')
let SqlParams = require('../../resources/SqlParams')
let epilogOperate = {};

/**
 * 查询一个问卷的评语
 */
epilogOperate.getEpilogById = id => {
  return new Promise((resolve, reject) => {
    db.query(epilogMapper.getEpilogById, [id], resolve)
  })
}
/**
 * 保存一个问卷的评语
 */
epilogOperate.saveEpilog = (inquiryId, epilogArr, fn) => {
  let sqlparam = new SqlParams()
  // 先删除
  sqlparam.setSql(epilogMapper.deleteEpilogByInquiryId, [inquiryId])
  epilogArr.forEach(item => {
    // 再增加
    sqlparam.setSql(epilogMapper.insertEpilog, [uuid(), item.minScore, item.maxScore, item.remark, inquiryId])
  })
  try {
    db.transactions(sqlparam.sqlArr, fn)
  } catch (error) {
    console.log(error)
  }
}
module.exports = epilogOperate;