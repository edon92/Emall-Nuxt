<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="订单列表" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="order-desc">
      <van-row>
        <van-col span="12" style="text-align: center">商品信息</van-col>
        <van-col span="4" style="text-align: center">单价</van-col>
        <van-col span="4" style="text-align: center">数量</van-col>
        <van-col span="4" style="text-align: center">合计</van-col>
      </van-row>
    </div>
    <div class="hasNoOrders" v-if="!newOrderList">
      还没有任何订单
    </div>
    <scroll class="scroll" v-else>
      <div>
        <div class="order-detail" v-for="(order, index) in newOrderList" :key="index">
          <div class="order-header">
            <div class="msg orderNo">订单号: {{order[0].orderId}}</div>
            <div class="msg more-msg">
              <span class="desc">
                查看更多
                <i class="iconfont icon-jiantou1 msg"></i>
              </span>
            </div>
          </div>
          <van-row class="order" v-for="(item, index) in order" :key="index">
            <van-col span="12" class="imgAndName">
              <div class="goodInfo">
                <img class="img" :src="item.goodImage" alt>
                <span class="GoodName">{{item.goodName}}</span>
              </div>
            </van-col>
            <van-col span="4" style="text-align: center" class="price">￥{{item.price.toFixed(2)}}</van-col>
            <van-col span="4" style="text-align: center" class="count">{{item.count}}</van-col>
            <van-col
              span="4"
              style="text-align: center"
              class="total"
            >￥{{(item.price * item.count).toFixed(2)}}</van-col>
          </van-row>
        </div>
      </div>
    </scroll>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner"/>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order";
import Scroll from "@/common/components/scroll";
export default {
  components: {
    Scroll
  },
  props: {},
  data() {
    return {
      orderList: {},
      newOrderList: [],
      showLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initialPage();
  },
  methods: {
    initialPage() {
      this.showLoading = true
      OrderService._getOrderList().then(res => {
        if (res.status === 200) {
          this.showLoading = false
          if (res.data.code == 0) {
            this.orderList = res.data.data;
            console.log(this.orderList);
          }
        }
        this.serializeData();
      }).catch(() => {
        this.showLoading = false
      })
    },
    serializeData() {
      let itemList = [];
      let OrderIdList = [];
      let i = 0;
      this.orderList.map((item, index) => {
        // 如果是新的OrderId
        let num = OrderIdList.findIndex(value => {
          return value === item.orderId;
        });
        if (num === -1) {
          OrderIdList.push(item.orderId);
          itemList[i] = [];
          itemList[i].push(item);
          i += 1;
        } else {
          itemList[i - 1].push(item);
        }
      });
      this.newOrderList = itemList;
      console.log(this.newOrderList);
    },
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
// @import '~assets/stylus/variable.styl'
.container
  .header
    position: fixed
    top: 0
    left: 0
    right: 0
  .order-desc
    position: fixed
    top: 46px
    left: 0
    right: 0
    font-size: 12px
    font-weight: 400
    color: #999
    background: #eee
  .order-header
    // margin-top: 46px
    font-size: 12px
    font-weight: 400
    color: #999
    .van-row
      background: #eee
      height: 18px
      line-height: 18px
  .order-detail
    background: #fbfbfb
    padding-bottom: 4px
    overflow: hidden
    .order-header
      display: flex
      height: 22px
      // line-height: 22px
      font-size: 12px
      justify-content: space-between
      padding: 6px 10px
      background: #eee
      margin-top: 10px
      .icon-jiantou1
        font-size: 12px
    .order
      margin-top: 4px
      height: 3.75rem
      line-height: 3.75rem
      background: #fafafa
      .goodInfo
        display: flex
        flex-wrap: nowrap
        img
          width: 60px
          height: 60px
        span
          margin-left: 4px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
  .scroll
    position: absolute
    top: 58px
    bottom: 60px
    left: 0
    right: 0
    overflow: hidden
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
  .hasNoOrders
    margin-top: 80px
    padding: 10px
    font-size: 16px
</style>