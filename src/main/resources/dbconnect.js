/*
 * @Author: qc 
 * @Date: 2017-12-26 20:36:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-03 14:39:14
 */
let connectionConfig = require('./dbconfig');
let mysql = require('mysql');
let db = {};
/**
 * 基本查询函数
 * @param {*操作数据库语句} sqllan 
 * @param {*sql参数} params
 * @param {*成功时的回调函数} fn 
 */
db.query = function (sqllan, params, fn) {
  let connection = mysql.createConnection(connectionConfig);
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  connection.query(sqllan, params, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    if (fn) {
      fn(rows);
    }
  });
  connection.end((err) => {
    if(err)
      return;
  });
}

module.exports = db;