/*
 * @Author: qc
 * @Date: 2018-01-03 17:09:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:40:02
 */
let roleMapper = require('../../resources/mapper/roleMapper');
let db = require('../../resources/dbconnect');
let roleOperate = {};
/**
 * 根据权限查对应的权限
 * @param {number} id 权限的id
 */
roleOperate.getOneRoleById = id => {
  return new Promise((resolve, reject) => {
    db.query(roleMapper.getOneRoleById, [id], resolve);
  });
}

module.exports = roleOperate;