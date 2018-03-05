<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short" v-bind:class="{'sort-up': !sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">

          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}" @click="setPriceAll()">All</a>
              </dd>
              <dd v-for="(price, index) in priceFilter" :key="price.id">
                <a href="javascript:void(0)" :class="{'cur': priceChecked===index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :key="item.id">
                  <div class="pic">
                    <a href="#"><img v-lazy="`/static/`+ item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
              <img src='./../assets/loading-spinning-bubbles.svg' v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登陆，否则无法加入到购物车中
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
.sort-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
.btn:hover {
  background-color: #ffe5e6;
  transform: al 0.3s ease-out;
}
</style>

<script>
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import "./../assets/css/login.css";

import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread.vue";
import Modal from "./../components/Modal";
import axios from "axios";

export default {
  data() {
    return {
      goodsList: [],
      sortFlag: false,
      priceChecked: "all",
      filterBy: false,
      overLayFlag: false,
      page: 1,
      pageSize: 8,
      busy: false,
      loading: false,
      priceChecked: "all",
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00"
        }
      ]
    };
  },
  mounted: function() {
    this.getGoodsList();
  },
  components: {
    NavHeader: NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods: {
    addCart(productId) {
      axios
        .post("/goods/addCart", {
          productId: productId
        })
        .then(res => {
          // 这是返回的数据是包含在data中
          console.log(res.data);
          if (res.data.status == "0") {
            this.mdShowCart = true;
          } else {
            this.mdShow = true;
          }
        });
    },
    closeModal() {
      this.mdShow = false;
    },
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      };
      this.loading = true;
      axios
        .get("/goods/list", {
          params: param
        })
        .then(result => {
          var res = result.data;
          if (res.status === "0") {
            // 请求成功
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list); // 数据需要累加

              if (res.result.count === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
          this.loading = false;
        });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    loadMore() {
      this.busy = true; // 滚动失效
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.page = 1;
      this.closePop();
      this.getGoodsList();
    },
    setPriceAll() {
      this.priceChecked = "all";
      this.closePop();
    }
  }
};
</script>
