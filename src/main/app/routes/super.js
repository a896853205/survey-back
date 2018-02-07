/*
 * @Author: qc
 * @Date: 2018-01-13 17:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-07 17:09:17
 */
let express = require('express');

let userOperate = require('../dao/userDao')
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();


/**
 * 更新自己的信息
 */
router.post('/updateMyInfo', (req, res, next) => {
  let result = new resultFunction()
  let param = req.body
  if (!param.name) {
    param.name = ''
  }
  if (!param.newPassword) {
    param.newPassword = ''
  }
  // @ts-ignore
  let user = req.local.user
  userOperate.updateUser ({
    account: user.account,
    password: param.newPassword,
    name: param.name
  })
  .then(() => {
    result.status = 1
    return res.json({
      statusObj: result
    })
  })
})

module.exports = router;