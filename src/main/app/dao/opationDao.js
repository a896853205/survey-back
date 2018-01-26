/*
 * @Author: qc
 * @Date: 2018-01-19 16:11:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-26 23:31:50
 */
let opationMapper = require('../../resources/mapper/opationMapper')
let db = require('../../resources/dbconnect');
let opationOperate = {};
/**
 * 查询一个问题的所有选项
 */
opationOperate.selectSomeOpations = id => {
  return new Promise((resolve, reject) => {
    db.query(opationMapper.selectSomeOpations, [id], resolve)
  })
}
module.exports = opationOperate;