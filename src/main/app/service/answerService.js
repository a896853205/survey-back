let answerOperate = require('../dao/answerDao')
let epilogOperate = require('../dao/epilogDao')
let inquiryOperate = require('../dao/inquiryDao')

let answerService = {}
/**
 * 获取问卷分析
 * @param {String} answerId 回答的id
 */
answerService.getAnalyze = answerId => {
  return new Promise ((resolve, reject) => {
    Promise.all([
      answerOperate.selectAllByAnswerId(answerId),
      epilogOperate.getEpilogByAnswerId(answerId),
      answerOperate.selectOneByAnswerId(answerId),
      inquiryOperate.selectInquiryByAnswerId(answerId)
    ])
    .then(value => {
      let analyzeArr = []
      let myEpilog = []
      // 所有结语
      analyzeArr = conductAnalyze(value[1], value[0])
      analyzeArr.forEach(analyzeItem => {
        let judgementScore = analyzeItem.score.split('~')
        if (parseInt(value[2][0].score) >= parseInt(judgementScore[0]) && parseInt(value[2][0].score) <= parseInt(judgementScore[1])) {
          myEpilog.push(analyzeItem)
        }
      })
      resolve({
        analyzeArr,
        myEpilog,
        myAnswer: value[2][0],
        myInquiry: value[3][0]
      })
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 获取问卷分析
 * @param {String} inquiryId 回答的id
 */
answerService.getAnalyzeByInquiryId = inquiryId => {
  return new Promise ((resolve, reject) => {
    Promise.all([
      answerOperate.selectAllByInquiryId(inquiryId),
      epilogOperate.getEpilogById(inquiryId)
    ])
    .then(value => {
      resolve(conductAnalyze(value[1], value[0]))
    })
  })
}
/**
 * 计算分析数组
 * @param {Array} epilogArr 结语数组
 * @param {Array} answerArr 回答数组
 */
function conductAnalyze (epilogArr, answerArr) {
  let analyzeArr = []
  epilogArr.forEach(epilogItem => {
    analyzeArr.push({
      score: `${epilogItem.begin_score}~${epilogItem.end_score}`,
      num: 0,
      epilog: epilogItem.remark
    })
  })
  answerArr.forEach(answerItem => {
    analyzeArr.forEach(analyzeItem => {
      let judgementScore = analyzeItem.score.split('~')
      if (answerItem.score >= parseInt(judgementScore[0]) && answerItem.score <= parseInt(judgementScore[1])) {
        analyzeItem.num++
      }
    })
  })
  return analyzeArr
}
module.exports = answerService