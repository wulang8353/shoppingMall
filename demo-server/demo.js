let http = require('http');
let url = require('url'); // 请求地址
let util = require('util');

http.createServer((req, res)=>{
    res.statusCode = 200;

    res.setHeader('Content-Type', "text/plain; charset=utf-8")

    // req.url 只是一个相对路径，没有协议和hash
    // util.inspect方便调试 
    // express的originalUrl可以拿到完整的URL，nodejs拿不到
    res.end(util.inspect(url.parse(req.url)))// 将对象打印成字符串输出

}).listen(3000, '127.0.0.1', ()=>{
    console.log("服务器已运行")
})