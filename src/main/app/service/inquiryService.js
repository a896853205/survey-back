let inquiryOperate = require('../dao/inquiryDao')
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')

let inquiryService = {}

inquiryService.selectInquiry = (inquiryId) => {
  return new Promise((resolve, reject) => {
    // 从req中获取问卷标题
    let inquiryInfo = null
    let questionInfo = []
    let opationInfo = []
    inquiryOperate.selectOne(inquiryId)
    .then(value => {
      inquiryInfo = value[0]
      return questionOperate.selectOne(inquiryId)
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
              resolve({
                inquiryInfo,
                questionInfo,
                opationInfo
              })
            }
          })
        })
      } else {
        resolve({
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
}

module.exports = inquiryService;