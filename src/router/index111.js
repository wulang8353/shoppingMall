/* 
Vue-router 是对history的一个封装
history.back()
history.go(0)刷新
history.pushState('describe','title','/path');
*/

import Vue from "vue";
import Router from "vue-router";
import GoodList from "./../views/GoodList";
// ‘@’：resolve('src') 相当于输入src这个地址

import Title from "@/views/Title";
import Image from "@/views/Image";
import Cart from "@/views/Cart";

Vue.use(Router);

export default new Router({
  // mode: 'history', 去除hash值 http://localhost:8080/#/goods/894/post/ww
  routes: [
    {
      path: "/goods/",
      name: "GoodList",
      component:  GoodList
    }
    // {
    //   path: "/goods/",
    //   name: "GoodList",
    //   components: {
    //     default: GoodList,
    //     title: Title,
    //     image: Image
    //   }
    // },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: Cart
    // }
  ]
});
