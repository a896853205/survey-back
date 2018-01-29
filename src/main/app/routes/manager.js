let express = require('express');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();
let uuid = require('uuid');
let inquiryOperate = require('../dao/inquiryDao');
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')
let epilogOperate = require('../dao/epilogDao')
router.post('/index',(req, res, next)=>{
  // 新建返回对象
  let result = new resultFunction();
  // 管理员业务逻辑代码
  result.status = 1;
  res.json(result);
});

// 增加问卷
router.post('/addInquiry', (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  // 从req中获取问卷标题
  let param = req.body;
  // 从token获取user信息
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
  let inquiryInfo = null
  let questionInfo = []
  let opationInfo = []
  inquiryOperate.selectOne(param.inquiryId)
  .then(value => {
    inquiryInfo = value[0]
    return questionOperate.selectOne(inquiryInfo.id)
  })
  .then(value => {
    questionInfo = value
    let OpationFinishNum = 0
    if (questionInfo.length !== 0) {
      questionInfo.forEach ((item, index) => {
        opationOperate.selectSomeOpations(item.id)
        .then(value => {
          OpationFinishNum = OpationFinishNum + 1
          opationInfo = opationInfo.concat(value)
          if (questionInfo.length === OpationFinishNum) {
            result.status = 1
            return res.json({
              statusObj: result,
              inquiryInfo,
              questionInfo,
              opationInfo
            })
          }
        })
      })
    } else {
      result.status = 1
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
    return
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
          inquiryOperate.updateAll(param.inquiryInfo, questionArr, opationArr, () => {
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
    epilogOperate.saveEpilog(param.inquiryId, param.inquiryEpilog, () => {
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
module.exports = router;
