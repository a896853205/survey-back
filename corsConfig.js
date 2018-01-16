/*
 * @Author: qc
 * @Date: 2018-01-11 19:02:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-16 14:31:11
 */
module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "accept,content-type,Authorization");
  res.header("Access-Control-Allow-Methods", "POST,GET");
  res.header("X-Powered-By", ' 3.2.1')
  if(req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
}