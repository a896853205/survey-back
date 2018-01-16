/*
 * @Author: qc 
 * @Date: 2017-12-26 20:36:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:54:25
 */
let connectionConfig = require('./dbconfig');
let mysql = require('mysql');
let db = {};
/**
 * 基本查询函数
 * @param {String} sqllan 操作数据库语句
 * @param {Array} params sql参数
 * @param {Function} fn 成功时的回调函数
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