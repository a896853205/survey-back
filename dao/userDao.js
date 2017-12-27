/*
 * @Author: qc
 * @Date: 2017-12-27 14:54:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-27 16:09:34
 */
let userSql = require('../database/sql/userSql');
let db = require('../database/dbconnect');
let userOperate = {};
/**
 * 根据用户名查询出当前用户
 * @param {*用户名} account 
 */
userOperate.oneUserQuery = function(account){
  return new Promise((resolve, reject)=>{
    let sql = userSql.getOneUserByAccount(account);
    // 进行异步查询
    db.query(sql, resolve);
  });
};

module.exports = userOperate;