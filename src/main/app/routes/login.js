/*
 * @Author: qc
 * @Date: 2018-01-13 14:41:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-13 17:56:01
 */
let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

let userOperate = require('../dao/userDao'); 
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
    return res.json(result);
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account).then(value => {
    // 判断若果没有此用户
    if (!value[0]) {
      result.errMessage = '没有此用户';
      return res.json(result);
    } else {
      // 返回是个数组输出第一个
      if(value[0].password === user.password){
        result.status = 1;
        // 返回status和token
        let dataBaseUser = value[0];
        dataBaseUser.password = '';
        return res.json({statusObj: result, 
          token: webToken.getToken(value[0]), 
          user: dataBaseUser
        });
      }else{
        result.errMessage = '密码不正确';
        return res.json(result);
      }
    }
  }).catch((err) => {
    // 返回错误的json
    console.log(err);
  });
});

module.exports = router;