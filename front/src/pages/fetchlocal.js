import axios from 'axios';

// 获取地图资讯
let fetchOnline = function(operation, callback, errHandle) {
  var url  = "http://localhost:35010/" + operation;
  // 发送请求:将数据返回到一个回到函数中
  // 并且响应成功以后会执行then方法中的回调函数
  axios
  .get(url)
  .then(function(result) {
    // result是所有的返回回来的数据
    // 包括了响应报文行
    // 响应报文头
    // 响应报文体
    callback(result.data);
  })
  .catch(function(err) {
    errHandle(err);
  });
}

export { fetchOnline }