var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  "checked":String,
  "productNum":Number,
  'productImage': String
});

// 导出模块， 模块名+模块依赖的productSchema  Good默认会加s 然后到数据库中进行查找 直接指定表
module.exports = mongoose.model("Good", productSchema, 'goods');
