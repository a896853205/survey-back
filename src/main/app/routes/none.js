var express = require('express');
var router = express.Router();

let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject')
let inquiryOperate = require('../dao/inquiryDao')
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')
let epilogOperate = require('../dao/epilogDao')
let userOperate = require('../dao/userDao')

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
 * 用户登录
 */
router.post('/login',(req, res, next)=>{
  // 新建返回对象
  let result = new resultFunction();
  // 在这里查数据库 参数是req.body.account
  let user = req.body;
  // 判断用户名是否为空
  if (!user.account){
    // 返回用户名为空的json
    result.errMessage = '用户名为空';
    return res.json({
      statusObj: result
    });
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account).then(value => {
    // 判断若果没有此用户
    if (!value[0]) {
      result.errMessage = '没有此用户';
      return res.json({
        statusObj: result
      });
    } else {
      // 返回是个数组输出第一个
      if(value[0].password === user.password){
        result.status = 1;
        // 返回status和token
        let dataBaseUser = value[0];
        dataBaseUser.password = '';
        return res.json({
          statusObj: result, 
          token: webToken.getToken(value[0]), 
          user: dataBaseUser
        });
      }else{
        result.errMessage = '密码不正确';
        return res.json({
          statusObj: result
        });
      }
    }
  }).catch((err) => {
    // 返回错误的json
    console.log(err);
  });
});

module.exports = router;
