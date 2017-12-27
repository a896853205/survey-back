var express = require('express');
var router = express.Router();

let userOperate = require('../dao/userDao'); 
router.post('/login',function(req, res, next){
  //在这里查数据库 参数是req.body.account
  let user = req.body;
  // 判断用户名是否为空
  if (!user.account){
    // 返回用户名为空的json
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account).then((value)=>{
    // 返回是个数组输出第一个
    res.json(value[0]);
  }).catch((err) => {
    // 返回错误的json
    console.log(err);
  });
});

module.exports = router;