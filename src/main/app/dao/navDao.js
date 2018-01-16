/*
 * @Author: qc
 * @Date: 2018-01-03 17:09:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:39:37
 */
let navMapper = require('../../resources/mapper/navMapper');
let db = require('../../resources/dbconnect');
let navOperate = {};
/**
 * 根据权限查对应的导航栏
 * @param {number} id 权限的id
 */
navOperate.getNavbyRole = id => {
  return new Promise((resolve, reject) => {
    db.query(navMapper.getNavbyRole, [id], resolve);
  });
}

module.exports = navOperate;