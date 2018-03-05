// nodejs在服务器端调用第三方接口（此时类似作为客户端）

let http = require("http");

let util = require("util");

http.get("http://www.imooc.com/u/card", function(res) {
  let data = "";

  // 客户端需要监听数据，不断累积，不会一步到位的
  res.on("data", function(chunk) {
    data += chunk;
  });

  res.on("end", function() {
    let result = JSON.parse(data);

    console.log(`result: ${util.inspect(result)}`);
  });
});
