// @ts-nocheck
/*
 * @Author: qc
 * @Date: 2018-01-03 14:49:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-13 17:01:11
 */
// 返回状态的备注
module.exports = function () {
  // 状态码:1为正确
  //       0为错误
  this.status = 0;
  // 错误信息
  this.errMessage = '';
}