/*
 * @Author: qc
 * @Date: 2018-01-13 17:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:46:31
 */
let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

let userOperate = require('../dao/userDao'); 
/**
 * 获取token的值
 */
router.post('/getToken',(req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  let token = req.headers["authorization"];
  let decoded = webToken.decodeDataToken(token);
  result.status = 1;
  res.json({
    statusObj: result,
    user: decoded
  })
});

module.exports = router;