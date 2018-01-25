/**
* 事件处理的参数
*/

module.exports = class SqlParams {
 constructor () {
   this.sqlArr = []
 }
 /**
  * 
  * @param {String} sqllan sql语句
  * @param {Array} param sql语句对应的参数
  */
  setSql (sqllan, param) {
    this.sqlArr.push({sqllan, param})
  }
}