<template>
  <div class="container">
    <div class="header1" v-show="showAbs">
      <div class="back icon" @click="back">
        <i class="iconfont icon-jiantou"></i>
      </div>
      <div class="cart icon" @click="backHome">
        <i class="iconfont icon-shopfill"></i>
      </div>
      <!-- <div class="more icon" @click="goTop">
        <i class="iconfont icon-huidaodingbu"></i>
      </div> -->
    </div>
    <div class="detail" ref="wrapper">
      <!-- <div> -->
      <div class="mainImg" v-if="goodDetail">
        <img :src="goodDetail.IMAGE1" alt>
        <span class="tag-right">正品渊源</span>
      </div>
      <div class="good-desc" v-if="goodDetail">
        <div class="new-price">
          <span class="price">￥{{goodDetail.PRESENT_PRICE.toFixed(2)}}</span>
          <span class="activity">活动中</span>
        </div>
        <div class="old-price" v-if="goodDetail">
          <span class="desc">价格</span>
          <span class="price">￥{{calculatePrice.toFixed(2)}}</span>
        </div>
        <div class="desc">
          <span class="name">{{goodDetail.NAME}}</span>
        </div>
        <div class="sales">
          <div class="delivery-price">运费: 0.00</div>
          <div class="sale">月销548单</div>
          <div class="plece">香港</div>
        </div>
        <div class="guarantee">
          <div class="line"></div>
          <div class="tax item" @click="showTaxDetail">
            <van-row>
              <van-col span="4">
                <span class="type">税费</span>
              </van-col>
              <van-col span="16">
                <span class="desc">进口税 商品售价已包税</span>
              </van-col>
              <van-col span="4" style="text-align:right">
                <i class="iconfont icon-jiantou1"></i>
              </van-col>
            </van-row>
          </div>
          <div class="serve item" @click="showServeDetail">
            <van-row>
              <van-col span="4">
                <span class="type">服务</span>
              </van-col>
              <van-col span="16">
                <span class="desc">支持溯源·破损包退·正品保障</span>
              </van-col>
              <van-col span="4" style="text-align:right">
                <i class="iconfont icon-jiantou1"></i>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="line"></div>
        <van-tabs swipeable sticky>
          <van-tab title="详情">
            <div class="detail-img" v-html="goodDetail.DETAIL"></div>
          </van-tab>
          <van-tab title="评论">
            <div class="comments" style="height:600px;font-size: 14px;">暂无评论</div>
          </van-tab>
        </van-tabs>
        <!-- <div class="line"></div> -->
      </div>
      <!-- </div> -->
    </div>
    <div class="bottomBar">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat-o" text="客服"/>
        <van-goods-action-mini-btn
          :info="totalGoodInCart"
          icon="cart-o"
          text="购物车"
          @click="toShopcart"
        />
        <van-goods-action-mini-btn icon="shop-o" text="商城" @click="backHome"/>
        <van-goods-action-big-btn text="加入购物车" @click="showShopcart"/>
        <van-goods-action-big-btn primary text="立即购买" @click="buyNow"/>
      </van-goods-action>
    </div>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner" color="#f8762c"/>
    </div>
    <van-popup v-model="showTax" position="bottom" :overlay="true" class="tax-pop">
      <div class="container">
        <div class="title">税费说明</div>
        <div class="item tax-desc">
          <van-row>
            <van-col span="6">
              <span class="type">商品进口税</span>
            </van-col>
            <van-col span="18">
              <span class="desc">商品承担</span>
            </van-col>
            <van-row>
              <van-col style="margin: 6px 0px 0px 50px;color: #999">
                <span class="remarks">(如遇海关抽检产生税率时，商家会承担相应的费用)</span>
              </van-col>
            </van-row>
          </van-row>
        </div>
        <div class="item tax-rate">
          <van-row>
            <van-col span="6">
              <span class="type">进口税税率</span>
            </van-col>
            <van-col span="18">
              <span class="desc">海关抽检时判断税率</span>
            </van-col>
          </van-row>
        </div>
        <div class="item tax-equation">
          <van-row>
            <van-col span="6">
              <span class="type">进口税计算</span>
            </van-col>
            <van-col span="18">
              <span class="desc">进口税 = 海关认定完税价 * 认定税率</span>
            </van-col>
          </van-row>
        </div>
        <div class="button">
          <van-button type="warning" class="finish-button" :block="true" @click="showTaxDetail">完成</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showServe" position="bottom" :overlay="true" class="serve-pop">
      <div class="container">
        <div class="title">基础保障</div>
        <div class="item guarantee-desc">
          <van-row>
            <van-col span="6">
              <span class="logo">正</span>
            </van-col>
            <van-col span="6">
              <span class="type">正品保障</span>
            </van-col>
            <van-row>
              <van-col style="margin: 15px 0px 0px 50px;color: #999">
                <span class="remarks">(100%海关正品，假一赔10)</span>
              </van-col>
            </van-row>
          </van-row>
        </div>
        <div class="item tax-rate">
          <van-row>
            <van-col span="6">
              <span class="logo">保</span>
            </van-col>
            <van-col span="6">
              <span class="type">15天售后无忧</span>
            </van-col>
            <van-row>
              <van-col style="margin: 15px 0px 0px 50px;color: #999">
                <span class="remarks" style="line-height: 16px">
                  确认收货之日15天(含)内，如有商品质
                  量问题、描述不符或溢漏损失缺发等(不包括因主观原因导致不想要)可申请退货
                </span>
              </van-col>
            </van-row>
          </van-row>
        </div>
        <div class="item tax-equation" style="margin-top: 20px">
          <van-row>
            <van-col span="6">
              <span class="logo">赠</span>
            </van-col>
            <van-col span="6">
              <span class="type">赠运费险</span>
            </van-col>
            <van-row>
              <van-col style="margin: 15px 0px 0px 50px;color: #999">
                <span
                  class="remarks"
                  style="line-height: 16px"
                >卖家为您购买的商品投保退货运费险卖家为您购买的商品投保退货运费险(保单生效以下单显示为准)</span>
              </van-col>
            </van-row>
          </van-row>
        </div>
        <div class="button">
          <van-button type="warning" class="finish-button" :block="true" @click="showTaxDetail">完成</van-button>
        </div>
      </div>
    </van-popup>
    <div class="showCart" v-if="goodDetail">
      <van-sku
        v-model="showCart"
        :sku="sku"
        :goods="goods"
        :goods-id="goodDetail.ID"
        :hide-stock="sku.hide_stock"
        :close-on-click-overlay="true"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        :message-config="messageConfig"
      />
    </div>
  </div>
</template>

<script>
import GoodService from "../service/good";
// import Bscroll from "better-scroll";
export default {
  components: {},
  layout: "login",
  props: {},
  data() {
    return {
      showLoading: true,
      goodDetail: null,
      Bscroll: null,
      showTax: false,
      showServe: false,
      showAbs: true,
      totalGoodInCart: "",
      messageConfig: {},
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0,
      // goods: {
      //   title: "dasdsad",
      //   picture: "https://img.yzcdn.cn/1.jpg"
      // },
      showCart: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "1215",
                name: "大",
                imgUrl: "https://img.yzcdn.cn/2.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "4.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            name: "备注",
            type: "text"
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      }
    };
  },
  computed: {
    calculatePrice() {
      let count = Math.floor(Math.random() * 10) / 10;
      let price = this.goodDetail.PRESENT_PRICE;
      return price * (1 + count);
    },
    goods() {
      return {
        title: this.goodDetail.NAME
      };
    }
  },
  watch: {},
  created() {},
  mounted() {
    // this.setDomHeight();
  },
  updated() {
    // this._initialScroll();
  },
  activated() {
    this.getDetail();
    this.getCartCount();
  },
  methods: {
    getDetail() {
      GoodService._getDetail(this.$route.query.goodsId)
        .then(res => {
          if (res.data.code === 0) {
            let timer = setTimeout(() => {
              this.showLoading = false;
            }, 1500);
            this.goodDetail = res.data.good;
            this.sku.tree[0].v[0].imgUrl = this.goodDetail.IMAGE1;
            this.sku.list[0].price = this.goodDetail.PRESENT_PRICE * 100;
          }
        })
        .catch(err => {
          this.$toast(err);
          this.showLoading = false;
        });
    },
    getCartCount() {
      if (localStorage.cartInfo) {
        let cartInfo = JSON.parse(localStorage.cartInfo);
        this.totalGoodInCart = cartInfo.length > 0 ? cartInfo.length : "";
      }
    },
    // setDomHeight() {
    //   let height = window.screen.height;
    //   this.$refs.wrapper.style.height = height - 50 + "px";
    // },
    // _initialScroll() {
    //   this.$nextTick(() => {
    //     this.Bscroll = new Bscroll(this.$refs.wrapper, {
    //       click: true,
    //       probeType: 3
    //     });
    //   });
    // },
    back() {
      window.history.go(-1);
    },
    backHome() {
      this.$router.push("/home");
    },
    toShopcart() {
      this.$router.push("/shopcart");
    },
    showTaxDetail() {
      this.showTax = !this.showTax;
    },
    showServeDetail() {
      this.showServe = !this.showServe;
    },
    goTop() {
      // this.Bscroll.scrollToElement(this.$refs.wrapper, 600);
      document.body.scrollTop = 0;
    },
    showShopcart() {
      this.showCart = !this.showCart;
    },
    // 给商品添加name属性
    goodaddName(good) {
      return Object.assign({}, good, {
        name: this.goodDetail.NAME
      });
    },
    hasGood(goodId) {
      return JSON.parse(localStorage.getItem("shopcart"));
    },
    buyNow() {
      let good = {
        goodsId: this.goodDetail.ID,
        selectedNum: 1,
        messages: ""
      };
      this.onBuyClicked(good);
    },
    onBuyClicked(good) {
      this.onAddCartClicked(good);
      this.$router.push("/shopcart");
    },
    onAddCartClicked(good) {
      //取出本地购物车中的商品
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == good.goodsId);
      //如果没有，直接添加购物车
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodDetail.ID,
          name: this.goodDetail.NAME,
          price: this.goodDetail.PRESENT_PRICE,
          image: this.goodDetail.IMAGE1,
          count: good.selectedNum,
          remark: good.messages
        };
        cartInfo.push(newGoodsInfo);
      } else {
        // 如果有，就修改购物车里面的数量
        let index = cartInfo.findIndex(cart => cart.goodsId == good.goodsId);
        cartInfo[index].count += good.selectedNum;
      }
      localStorage.cartInfo = JSON.stringify(cartInfo);
      this.$toast.success("添加成功");
      this.getCartCount();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
.container
  min-height: 100%
  .header1
    position: fixed
    // display: flex
    left: 0px
    right: 0px
    color: #fff
    height: 3.75rem
    font-size: 1.25rem
    padding: 1rem 0.5rem
    z-index: 99
    .icon
      width: 1.8rem
      height: 1.8rem
      border-radius: 50%
      background: #555
      opacity: 0.4
      text-align: center
      line-height: 1.8rem
    .cart
      position: absolute
      top: 16px
      right: 10px
  .detail
    // position: relative
    padding-bottom: 50px
    background: #eee
    overflow: scroll
    .mainImg
      position: relative
      overflow: hidden
      height: 0
      width: 100%
      padding-bottom: 100%
      img
        width: 100%
      .tag-right
        position: absolute
        background: #000
        color: #fff
        width: 60px
        height: 18px
        font-size: 10px
        border-radius: 0.625rem
        opacity: 0.3
        left: 10px
        bottom: 5%
        line-height: 18px
        text-align: center
    .good-desc
      background: #fff
      .new-price
        padding: 0px 0.625rem
        .price
          font-size: 20px
          color: $color-theme
        .activity
          margin-left: 4px
          color: $color-theme
          font-weight: 400
          padding: 0px 2px
          font-size: 12px
          background: #ccc
          border-radius: 5px
      .old-price
        padding: 0px 0.625rem
        margin-top: 10px
        font-size: 16px
        color: #888
        .price
          text-decoration: line-through
      .desc
        margin-top: 10px
        .name
          font-weight: 500
          font-size: 18px
          color: #666
          padding: 0px 0.625rem
      .sales
        display: flex
        margin-top: 10px
        color: #999
        justify-content: space-between
        padding: 0px 0.625rem
        font-size: 10px
      .guarantee
        font-size: 14px
        margin-top: 10px
        color: #999
        .line
          width: 100%
          height: 12px
          background: #eee
        .item
          padding: 4px 4px 0 4px
          height: 35px
          line-height: 35px
          .desc
            color: #444
        .tax, .serve
          margin-top: 10px
          padding-bottom: 10px
      .detail-img
        // width: 100%
        // padding-bottom: 1000px
        // overflow: hidden
        // height: 0
      .line
        width: 100%
        height: 12px
        background: #eee
  .tax-pop
    height: 31.25rem
    border-radius: 10px 10px 0px 0px
    font-size: 12px
    .container
      padding: 14px 10px
      display: flex
      flex-direction: column
      .title
        height: 20px
        line-height: 20px
        font-size: 1rem
        text-align: center
      .item
        height: 2.3rem
        margin-top: 10px
        bottom-1px(#eee)
        .type
          color: #777
      .button
        position: absolute
        bottom: 4%
        width: 300px
        left: 2.5rem
        .finish-button
          border-radius: 20px
  .serve-pop
    position: fixed
    bottom: 0
    height: 31.25rem
    border-radius: 10px 10px 0px 0px
    .container
      padding: 14px 10px 14px 20px
      display: flex
      flex-direction: column
      font-size: 12px
      .title
        height: 20px
        line-height: 20px
        font-size: 1rem
        text-align: center
      .item
        height: 4.2rem
        margin-top: 10px
        // bottom-1px(#eee)
        .logo
          color: #c60023
          border: 1px solid #c60023
          border-radius: 50%
          padding: 2px
        .type
          color: #333
          font-size: 14px
      .button
        position: absolute
        bottom: 4%
        width: 300px
        left: 2.5rem
        .finish-button
          border-radius: 20px
  .bottomBar
    position: relative
    z-index: 100
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
</style>