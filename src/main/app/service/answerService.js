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
      value[1].forEach(epilogItem => {
        analyzeArr.push({
          score: `${epilogItem.begin_score}~${epilogItem.end_score}`,
          num: 0,
          epilog: epilogItem.remark
        })
      })
      // 所有回答(插入数)
      value[0].forEach(answerItem => {
        analyzeArr.forEach(analyzeItem => {
          let judgementScore = analyzeItem.score.split('~')
          if (answerItem.score >= parseInt(judgementScore[0]) && answerItem.score <= parseInt(judgementScore[1])) {
            analyzeItem.num++
          }
        })
      })
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

module.exports = answerService