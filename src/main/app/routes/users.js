let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

let userOperate = require('../dao/userDao'); 
router.post('/login',(req, res, next)=>{
  // 新建返回对象
  let result = new resultFunction();
  // 在这里查数据库 参数是req.body.account
  let user = req.body;
  // 判断用户名是否为空
  if (!user.account){
    // 返回用户名为空的json
    result.errMessage = '用户名为空';
    return res.json(result);
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account).then((value)=>{
    // 判断若果没有此用户
    if (!value[0]) {
      result.errMessage = '没有此用户';
    } else {
      // 返回是个数组输出第一个
      if(value[0].password === user.password){
        result.status = 1;
        result.token = webToken.getToken(value[0]);
      }else{
        result.errMessage = '密码不正确';
      }
    }
    res.json(result);
  }).catch((err) => {
    // 返回错误的json
    console.log(err);
  });
});

module.exports = router;