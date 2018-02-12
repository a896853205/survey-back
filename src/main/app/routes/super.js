/*
 * @Author: qc
 * @Date: 2018-01-13 17:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-12 23:22:40
 */
let express = require('express');
// dao
let userOperate = require('../dao/userDao')
let inquiryOperate = require('../dao/inquiryDao');
// service
let userService = require('../service/userService')
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
    result.linkSuccess()
    return res.json({
      statusObj: result
    })
  })
})
/**
 * 获取所有管理员
 */
router.post('/getAllManager', (req, res, next) => {
  let result = new resultFunction()
  userService.getManagerInquiry()
  .then(managerArr => {
    result.linkSuccess()
    return res.json({
      statusObj: result,
      managerArr
    })
  })
})
/**
 * 问卷是否开启
 */
router.post('/toggle', (req, res, next) => {
  let result = new resultFunction();
  let param = req.body
  inquiryOperate.updateToggle(param.inquiryId, param.inquriySwitch)
  .then(value => {
    // 成功了的话
    result.linkSuccess()
    return res.json({
      statusObj: result
    })
  })
})

module.exports = router;