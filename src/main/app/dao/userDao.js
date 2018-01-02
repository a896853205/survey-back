/*
 * @Author: qc
 * @Date: 2017-12-27 14:54:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-03 00:49:33
 */
let userMapper = require('../../resources/mapper/userMapper');
let db = require('../../resources/dbconnect');
let userOperate = {};
/**
 * 根据用户名查询出当前用户
 * @param {*用户名} account 
 */
userOperate.oneUserQuery = function(account){
  return new Promise((resolve, reject)=>{
    // 进行异步查询
    db.query(userMapper.getOneUserByAccount,[account], resolve);
  });
};

module.exports = userOperate;