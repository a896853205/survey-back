let inquiryOperate = require('../dao/inquiryDao')
let questionOperate = require('../dao/questionDao')
let opationOperate = require('../dao/opationDao')

let inquiryService = {}
/**
 * 查询问卷的所有信息(问题和选项)
 * @param {String} inquiryId 问卷的id
 */
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
      let opationPromise = []
      if (questionInfo.length !== 0) {
        questionInfo.forEach ((item, index) => {
          opationPromise.push(opationOperate.selectSomeOpations(item.id))
        })
        return Promise.all(opationPromise)
      } else {
        resolve({
          inquiryInfo,
          questionInfo,
          opationInfo
        })
      }
    })
    .then(value => {
      let opationInfo = []
      // value 是很多数组的数组,需要进行处理一下
      value.forEach(item => {
        opationInfo = opationInfo.concat(item)
      })
      resolve({
      inquiryInfo,
      questionInfo,
      opationInfo
      })
    })
    .catch(e => {
      console.log(e)
      return
    })
  })
}

module.exports = inquiryService;