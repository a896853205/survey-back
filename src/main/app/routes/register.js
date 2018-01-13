let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

let userOperate = require('../dao/userDao'); 

router.post('/register', (req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  let user = req.body;
  // 先查询是否有重复
  userOperate.oneUserQuery(user.account).then(value => {
    // 判断若果没有此用户
    if (!value[0]) {
      // 插入数据库
      userOperate.oneUserInsert({
        account: user.account,
        password: user.password})
    } else {
      result.errMessage = '已有此用户';
      return res.json(result);
    }
  })
  .then(() => {
    result.status = 1;
    return res.json();
  })
  .catch(err => {
    // 返回错误的json
    console.log(err);
  });
})

module.exports = router;