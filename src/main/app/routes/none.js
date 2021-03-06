var express = require('express')
var router = express.Router()
let uuid = require('uuid')
let webToken = require('../common/token')
// 返回状态对象
let resultObject = require('../common/returnObject')
// dao
let inquiryOperate = require('../dao/inquiryDao')
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')
let epilogOperate = require('../dao/epilogDao')
let userOperate = require('../dao/userDao')
let answerOperate = require('../dao/answerDao')
// service
let answerService = require('../service/answerService')
let inquriyService = require('../service/inquiryService')
/**
 * 查询问卷
 */
router.post('/selectInquiry', (req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  // 从req中获取问卷标题
  let param = req.body
  // param.inquiryId
  inquiryOperate.selectOne(param.inquiryId)
  .then(value => {
    // 这里需要判断switch是否开启,否则跳到别的地方
    if (value[0]) {
      if (value[0].switch === '1') {
        return inquriyService.selectInquiry(param.inquiryId)
      }
    }
    result.linkSuccess()
    return res.json({
      statusObj: result
    })
  })
  .then(({inquiryInfo, questionInfo, opationInfo}) => {
    // 先判断上面是否开启问卷之类的
    if (result.errMessage === '') {
      result.linkSuccess()
      return res.json({
        statusObj: result,
        inquiryInfo,
        questionInfo,
        opationInfo
      })
    }
  })
  .catch(e => {
    console.log(e)
  })
})
/**
 * 查询结语
 */
router.post('/selectEpilog', (req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  // 从req中获取问卷标题
  let param = req.body
  let epilogInfo = []
  epilogOperate.getEpilogById(param.inquiryId)
  .then(value => {
    value.forEach(item => {
      epilogInfo.push({
        minScore: item.begin_score,
        maxScore: item.end_score,
        remark: item.remark
      })
    })
    result.linkSuccess()
    return res.json({
      statusObj: result,
      epilogInfo
    })
  })
  .catch (e => {
    console.log(e)
  })
})
/**
 * 用户登录
 */
router.post('/login',(req, res, next)=>{
  // 新建返回对象
  let result = new resultObject()
  // 在这里查数据库 参数是req.body.account
  let user = req.body
  // 判断用户名是否为空
  if (!user.account){
    // 返回用户名为空的json
    result.errMessage = '用户名为空'
    return res.json({
      statusObj: result
    })
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account)
  .then(value => {
    // 判断若果没有此用户
    if (!value[0]) {
      result.errMessage = '没有此用户'
      return res.json({
        statusObj: result
      })
    } else {
      // 返回是个数组输出第一个
      if(value[0].password === user.password){
        result.linkSuccess()
        // 返回status和token
        let dataBaseUser = value[0]
        dataBaseUser.password = ''
        switch (dataBaseUser.role_id) {
          case '1': 
            dataBaseUser.baseUrl = '/super'
            break
          case '2':
            dataBaseUser.baseUrl = '/manager'
            break
          default:
            dataBaseUser.baseUrl = '/'
        }
        return res.json({
          statusObj: result,
          token: webToken.getToken(value[0]), 
          user: dataBaseUser
        })
      } else {
        result.errMessage = '密码不正确'
        return res.json({
          statusObj: result
        })
      }
    }
  })
  .catch(err => {
    // 返回错误的json
    console.log(err)
  })
})
/**
 * 注册一个用户
 */
router.post('/register', (req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  let user = req.body
  // 先查询是否有重复
  userOperate.oneUserQuery(user.account)
  .then(value => {
    // 判断若果没有此用户
    if (!value[0]) {
      // 插入数据库
      return userOperate.oneUserInsert({
        account: user.account,
        password: user.password
      })
    } else {
      result.errMessage = '已有此用户'
    }
  })
  .then(() => {
    if (!result.errMessage) {
      result.linkSuccess()
    }
    return res.json({
      statusObj: result
    })
  })
  .catch(err => {
    // 返回错误的json
    console.log(err)
  })
})
/**
 * 保存回答
 */
router.post('/saveAnswer', (req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  let param = req.body
  let totalNum = 0
  param.questionData.forEach(questionItem => {
    questionItem.opationData.forEach(opationItem => {
      if (opationItem.isActive) {
        totalNum = totalNum + opationItem.score
      }
    })
  })
  let answerId = uuid()
  // 插入问卷回答的信息和所有的回答的信息.(事务处理)
  answerOperate.insertOne(totalNum, param.id, param, answerId)
  .then(value => {
    result.linkSuccess()
    return res.json({
      statusObj: result,
      answerId
    })
  })
  .catch(e => {
    console.log(e)
  })
})
/**
 * 获取分析
 */
router.post('/getAnalyze', (req, res, next) => {
  // 新建返回对象
  let result = new resultObject()
  let param = req.body
  // 根据回答id查询问卷id再查出所有回答
  answerService.getAnalyze(param.answerId)
  .then(({analyzeArr, myEpilog, myAnswer, myInquiry}) => {
    // 查询所有这个问卷的所有回答,查询这个问卷的所有结语
    // 处理成下面的形式
    // [{score: '0~5',num: 10}, {score: '6~10',num: 21}]
    // 和自己的分数, 和对应的结语, 返回给前台
    result.linkSuccess()
    return res.json({
      statusObj: result,
      analyzeArr,
      myEpilog,
      myAnswer,
      myInquiry
    })
  })
  .catch(e => {
    console.log(e)
  })
})
module.exports = router
