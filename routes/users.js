let express = require('express');
let webToken = require('../custom/token');
let router = express.Router();

let userOperate = require('../dao/userDao'); 
router.post('/login',function(req, res, next){
  //在这里查数据库 参数是req.body.account
  let user = req.body;
  let result = {status:0};
  // 判断用户名是否为空
  if (!user.account){
    // 返回用户名为空的json
    res.json(result);
  }
  // 查询成功返回json
  userOperate.oneUserQuery(user.account).then((value)=>{
    // 返回是个数组输出第一个
    if(value[0].password === user.password){
      result.status = 1;
      result.token = webToken.getToken(user);
    }
    res.json(result);
  }).catch((err) => {
    // 返回错误的json
    console.log(err);
  });
});

module.exports = router;