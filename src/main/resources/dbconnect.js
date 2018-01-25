/*
 * @Author: qc 
 * @Date: 2017-12-26 20:36:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-25 23:40:03
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
/**
 * 事件处理包装函数
 * @param {Array} sqlParams 包含SQL语句与当前语句参数的对象的数组 
 * @param {Function} fn 成功时的回调函数
 */
db.transactions = function (sqlParams, fn) {
  let connection = mysql.createConnection(connectionConfig)
  connection.beginTransaction(err => {
    if (err) { throw err }
    onceTransaction(connection, sqlParams, 0, fn)
  })
}
/**
 * 每一次的数据处理
 * @param {Object} connection 与数据库的链接
 * @param {Array} sqlParams 包含SQL语句与当前语句参数的对象的数组
 * @param {number} index 所在的系数
 * @param {Function} fn 成功时的回调函数
 */
function onceTransaction (connection, sqlParams, index, fn) {
  connection.query(sqlParams[index].sqllan, sqlParams[index].param, err => {
    if (err) {
      return connection.rollback(() => {
        throw err
      })
    } else {
      if (index === sqlParams.length - 1) {
        connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              throw err
            })
          }
          console.log('事件处理结束')
          // 成功时调用回调函数
          fn()
        })
      } else {
        onceTransaction(connection, sqlParams, index + 1, fn)
      }
    }
  })
}

module.exports = db;