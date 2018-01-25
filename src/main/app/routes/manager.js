let express = require('express');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();
let uuid = require('uuid');
let inquiryOperate = require('../dao/inquiryDao'); 

router.post('/index',(req, res, next)=>{
  // 新建返回对象
  let result = new resultFunction();
  // 管理员业务逻辑代码
  result.status = 1;
  res.json(result);
});

// 增加问卷
router.post('/addInquiry', (req, res, next) => {
  console.log('进到路由')
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
module.exports = router;