let express = require('express');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

router.post('/index',(req, res, next)=>{
  // 新建返回对象
  let result = new resultFunction();
  // 管理员业务逻辑代码
  result.status = 1;
  res.json(result);
});

module.exports = router;