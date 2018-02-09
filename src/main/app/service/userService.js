let userOperate = require('../dao/userDao')
let inquiryOperate = require('../dao/inquiryDao')

let userService = {}

/**
 * 获取所有管理员所有对应的问卷
 */
userService.getManagerInquiry = () => {
  // 查询所有的管理员和所有的问卷
  // 然后把所有的问卷按照管理员的id,
  // 插入到所对应的{}中,命名为
  // {
  //   inquiryData:[
  //     {
  //        inquiryId: '',
  //        ...
  //     }
  //   ]
  // }
  return new Promise((resolve, reject) => {
    // 查询所有管理员
    let managerArr = []
    userOperate.selectAllManager()
    .then(returnArr => {
      managerArr = returnArr
      return inquiryOperate.selectAllInquiry()
    })
    .then(inquiryArr => {
      managerArr.forEach(managerItem => {
        // 初始化问卷数组
        managerItem.inquiryData = []
        inquiryArr.forEach(inquiryItem => {
          if (managerItem.id === inquiryItem.user_id) {
            // 放问卷
            managerItem.inquiryData.push(inquiryItem)
          }
        })
      })
      // 返回管理员数组(带着问卷)
      resolve(managerArr)
    })
  })
}

module.exports = userService