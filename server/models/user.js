var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [
    {
      productId: String,
      productName: String,
      salePrice: String,
      productImage: String,
      checked: String,
      productNum: String
    }
  ],
  addressList: [
    {
      addressId: String,
      userName: String,
      streetName: String,
      postCode: Number,
      tel: Number,
      isDefault: Boolean
    }
  ]
});

// 导出模块， 模块名+模块依赖的productSchema  User默认会加s 然后到数据库中进行查找 直接指定表
module.exports = mongoose.model("User", userSchema);
