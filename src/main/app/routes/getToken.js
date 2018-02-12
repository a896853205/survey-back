/*
 * @Author: qc
 * @Date: 2018-01-13 17:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-12 20:37:20
 */
let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultObject = require('../common/returnObject');
let router = express.Router();

let userOperate = require('../dao/userDao'); 
/**
 * 获取token的值
 */
router.post('/getToken',(req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  let token = req.headers["authorization"]
  let decoded = webToken.decodeDataToken(token)
  switch (decoded.role_id) {
    case '1': 
      decoded.baseUrl = '/super'
      break
    case '2':
      decoded.baseUrl = '/manager'
      break
    default:
      decoded.baseUrl = '/'
  }
  result.linkSuccess()
  res.json({
    statusObj: result,
    user: decoded
  })
})

module.exports = router;