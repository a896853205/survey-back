/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-28 00:19:41
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
module.exports = questionOperate;