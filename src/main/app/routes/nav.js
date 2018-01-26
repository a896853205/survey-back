/*
 * @Author: qc
 * @Date: 2018-01-16 11:20:47 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-20 22:19:07
 */
let express = require('express');
let webToken = require('../common/token');
// 返回状态对象
let resultFunction = require('../common/returnObject');
let router = express.Router();

let navOperate = require('../dao/navDao'); 

router.post('/getNav',(req, res, next) => {
  // 新建返回对象
  let result = new resultFunction();
  let user = req.local.user;
  let navArr = [];
  navOperate.getNavbyRole(user.role_id)
  .then(value => {
    navArr = createNavObj(value, 1, 0);
    result.status = 1;
    // 查询nav
    return res.json({
      statusObj: result,
      navData: navArr
    });
  })
  .catch (e => {
    console.log(e)
  })
})

/**
 * nav对象创建函数
 * @param {Array} dataArr 总数据数组
 * @param {number} level 当前等级
 * @param {number} parentId 父亲等级
 */
function createNavObj (dataArr, level, parentId) {
  let objArr = [];
  dataArr.forEach(value => {
    if (value.level === level && value.parentId === parentId) {
      let childArr = createNavObj(dataArr, level + 1, value.id);
      objArr.push({
        liName: value.name,
        liHref: value.href,
        iconClass: value.icon,
        children: childArr
      })
    }
  })
  return objArr
}

module.exports = router;