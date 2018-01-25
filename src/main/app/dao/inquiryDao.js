/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-25 23:48:34
 */

let inquiryMapper = require('../../resources/mapper/inquiryMapper');
let questionMapper = require('../../resources/mapper/questionMapper')
let opationMapper = require('../../resources/mapper/opationMapper')
let uuidin = require('uuid')
let db = require('../../resources/dbconnect');
let SqlParams = require('../../resources/SqlParams')
let inquiryOperate = {};
/**
 * 插入一条问卷
 */
inquiryOperate.insertOne = ({uuid, user_id, title, description, state}, fn) => {
  // 这里生成时间
  let myDate = new Date();
  let now =  myDate.toLocaleDateString();
  // 默认100年后失效
  myDate.setDate(myDate.getDate() + 365 * 100);
  let end = myDate.toLocaleDateString();
  let sqlparam = new SqlParams()
  sqlparam.setSql(inquiryMapper.insertInquiry, [uuid, user_id, 0, title, now, end, description, state])
  // ----------------这里不应该只插入问卷还得插入个问题两个选项.
  // 插入题目
  let question1Uuid = uuidin()
  let question2Uuid = uuidin()
  sqlparam.setSql(questionMapper.insertQuestion, [question1Uuid, uuid, 1, 1, '新建问卷', ''])
  sqlparam.setSql(questionMapper.insertQuestion, [question2Uuid, uuid, 2, 1, '新建问卷', ''])
  // 插入选项
  sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question1Uuid, '新建选项1', 0])
  sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question1Uuid, '新建选项2', 0])
  sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question2Uuid, '新建选项1', 0])
  sqlparam.setSql(opationMapper.insertOpation, [uuidin(), '', question2Uuid, '新建选项2', 0])
  // 开始事务,fn为成功回调函数
  db.transactions(sqlparam.sqlArr, fn)
}


module.exports = inquiryOperate;