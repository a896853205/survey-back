/*
 * @Author: qc
 * @Date: 2017-12-27 14:54:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:44:18
 */
let userMapper = require('../../resources/mapper/userMapper');
let db = require('../../resources/dbconnect');
let uuid = require('uuid');
let userOperate = {};
/**
 * 根据用户名查询出当前用户
 * @param {String} account 用户名
 */
userOperate.oneUserQuery = account => {
  return new Promise((resolve, reject)=>{
    // 进行异步查询
    db.query(userMapper.getOneUserByAccount,[account], resolve);
  });
};
/**
 * 插入一个用户
 */
userOperate.oneUserInsert = ({account, password}) => {
  return new Promise((resolve, reject)=>{
    // 进行异步查询
    db.query(userMapper.insertOneUser,[uuid(), account, password, '2'], resolve);
  });
};
module.exports = userOperate;