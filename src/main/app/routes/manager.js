let express = require('express');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();
let uuid = require('uuid');
let inquiryOperate = require('../dao/inquiryDao');
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')
let epilogOperate = require('../dao/epilogDao')
let answerOperate = require('../dao/answerDao')
let userOperate = require('../dao/userDao')

let inquriyService = require('../service/inquiryService')
let answerService = require('../service/answerService')
// 增加问卷
router.post('/addInquiry', (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  // 从req中获取问卷标题
  let param = req.body;
  // 从token获取user信息
  // @ts-ignore
  let user = req.local.user;
  // 这里将自己的id传入dao中插入一条问卷,状态为1,开关为关,插入标题,描述,生成创建时间.
  let par = {
    uuid: uuid(),
    user_id: user.id, 
    title: param.title, 
    description: param.description,
    state: 1
  }
  try {
    inquiryOperate.insertOne(par, () => {
      // 插入成功
      result.status = 1;
      res.json({
        statusObj: result,
        inquiryId: par.uuid
      });
    })
  } catch (e) {
    console.log(e)
    result.errMessage = '问卷第一级别问卷插入失败'
    res.json({
      statusObj: result
    });
  }
});

// 查询问卷
router.post('/selectInquiry', (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  // 从req中获取问卷标题
  let param = req.body;
  inquriyService.selectInquiry(param.inquiryId)
  .then(({inquiryInfo, questionInfo, opationInfo}) => {
    result.status = 1
    return res.json({
      statusObj: result,
      inquiryInfo,
      questionInfo,
      opationInfo
    })
  })
})
/**
 * 查询结语
 */
router.post('/selectEpilog', (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  // 从req中获取问卷标题
  let param = req.body;
  let epilogInfo = []
  try {
    epilogOperate.getEpilogById(param.inquiryId)
    .then(value => {
      value.forEach(item => {
        epilogInfo.push({
          minScore: item.begin_score,
          maxScore: item.end_score,
          remark: item.remark
        })
      })
      result.status = 1
      return res.json({
        statusObj: result,
        epilogInfo
      })
    })
    .catch (e => {
      console.log(e)
    })
  } catch (error) {
    console.log(error)
  }
})
/**
 * 保存一个问卷
 */
router.post('/saveInquiry', (req, res, next) => {
  let result = new resultFunction();
  let param = req.body
  let opationArr = []
  // 首先查询所有的此问卷的相关信息
  questionOperate.selectOne(param.inquiryInfo.id)
  .then(questionArr => {
    let OpationFinishNum = 0
    questionArr.forEach ((item, index) => {
      opationOperate.selectSomeOpations(item.id)
      .then(value => {
        OpationFinishNum = OpationFinishNum + 1
        opationArr = opationArr.concat(value)
        if (questionArr.length === OpationFinishNum) {
          // 然后进行更新操作
          inquiryOperate.updateAll(param.inquiryInfo, 2,questionArr, opationArr, () => {
            result.status = 1
            return res.json({
              statusObj: result
            })
          })
        }
      })
    })
  })
  .catch(e => {
    console.log(e)
  })
})
/**
 * 保存一个问卷的结语
 */
router.post('/saveEpilog', (req, res, next) => {
  let result = new resultFunction();
  let param = req.body
  // param.inquiryId param.inquiryEpilog
  try {
    epilogOperate.saveEpilog(param.inquiryId, 3, param.inquiryEpilog, () => {
      // 成功了的话
      result.status = 1
      return res.json({
        statusObj: result
      })
    })
  } catch (error) {
    console.log(error)
  }
})
/**
 * 问卷是否开启
 */
router.post('/toggle', (req, res, next) => {
  let result = new resultFunction();
  let param = req.body
  try {
    inquiryOperate.updateToggle(param.inquiryId, param.inquriySwitch)
    .then(value => {
      // 成功了的话
      result.status = 1
      return res.json({
        statusObj: result
      })
    })
  } catch (error) {
    console.log(error)
  }
})
router.post('/selectAllQuestion', (req, res, next) => {
  let result = new resultFunction()
  // @ts-ignore
  let user = req.local.user
  // 用用户的id查询所有它的问卷
  inquiryOperate.selectAllInquiryByUserId(user.id)
  .then(value => {
    // 成功了的话
    result.status = 1
    return res.json({
      statusObj: result,
      inquiryData: value
    })
  })
})
// 删除问卷
router.post('/deleteInquiry', (req, res, next) => {
  let result = new resultFunction()
  let param = req.body
  // 先查询所有的问题,然后全部删除.
  questionOperate.selectOne(param.inquiryId)
  .then(questionArr => {
    inquiryOperate.deleteInquiry(param.inquiryId, questionArr, () => {
      // 成功了的话
      result.status = 1
      return res.json({
        statusObj: result
      })
    })
  })
})
router.post('/getAnalyzeByInquiyrId', (req, res, next) => {
  let result = new resultFunction()
  let param = req.body
  answerService.getAnalyzeByInquiryId(param.inquiryId)
  .then(analyzeArr => {
    result.status = 1
    return res.json({
      statusObj: result,
      analyzeArr
    })
  })
})
/**
 * 获取所有回答根据问卷id
 */
router.post('/getAllAnswerByInquiryId', (req, res, next) => {
  let result = new resultFunction()
  let param = req.body
  answerOperate.selectAllByInquiryId(param.inquiryId)
  .then(value => {
    result.status = 1
    return res.json({
      statusObj: result,
      answerArr: value
    })
  })
})
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
