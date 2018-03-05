var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("../models/goods");

// 1 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/db_demo");

// 2 监听数据库有没有成功
mongoose.connection.on("connected", function() {
  console.log("success");
});

mongoose.connection.on("error", function() {
  console.log("error");
});

mongoose.connection.on("disConnected", function() {
  console.log("disConnected");
});

// 3 二级路由
router.get("/list", function(req, res, next) {
  // node-server中使用url.parse(req.url).pathname
  // express 4.X版本获取查询字符串的方式改变
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let priceLevel = req.query.priceLevel;
  let skip = (page - 1) * pageSize;
  let paramsNum = {};
  var priceGt = "";
  var priceLte = "";

  if (priceLevel !== "all") {
    switch (priceLevel) {
      case "0":
        priceGt = 0;
        priceLte = 100;
        break;
      case "1":
        priceGt = 100;
        priceLte = 500;
        break;
      case "2":
        priceGt = 500;
        priceLte = 1000;
        break;
      case "3":
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    paramsNum = {
      salePrice: {
        $gt: priceGt,
        $lt: priceLte
      }
    };
  }

  let goodsModel = Goods.find(paramsNum)
    .skip(skip)
    .limit(pageSize);

  goodsModel.sort({ salePrice: sort });
  goodsModel.exec(function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        msg: "",
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

// 加入购物车
router.post("/addCart", function(req, res, next) {
  var userId = "100000077"; // 当前登陆的用户
  var productId = req.body.productId; // post方法下使用body方法
  var User = require("../models/user");
  User.findOne({ userId: userId }, function(err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (userDoc) {
        let goodsItem = "";
        userDoc.cartList.forEach(function(item) {
          if (item.productId === productId) {
            goodsItem = item;
            item.productNum++;
          }
        });
        if (goodsItem) {
          userDoc.save(function(err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              });
            } else {
              res.json({
                status: "0",
                msg: "suc",
                result: "suc"
              });
            }
          });
        } else {
          // 一件商品
          Goods.findOne({ productId: productId }, function(err1, doc) {
            if (err) {
              res.json({
                status: "1",
                msg: err1.message
              });
            } else {
              if (doc) {
                doc.productNum = 1;
                doc.checked = 1; // 默认商品选中
                userDoc.cartList.push(doc);
                userDoc.save(function(err2, doc2) {
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    });
                  } else {
                    res.json({
                      status: "0",
                      msg: "",
                      result: "suc"
                    });
                  }
                });
              }
            }
          });
        }
      }
    }
  });
});

// 4 导出模块
module.exports = router;
