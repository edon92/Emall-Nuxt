<template>
  <div class="container">
    <div  class="shopcart-header">
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="scroll hook" ref="wrapper" v-show="cartInfo.length">
        <div class="item" v-for="(item, index) in cartInfo" :key="index">
          <van-swipe-cell :right-width="65">
            <van-cell-group>
              <van-card
                :num="item.count"
                :price="item.price.toFixed(2)"
                :desc="item.remark.message_0"
                :title="item.name"
                :thumb="item.image"
              />
              <van-stepper
                v-model="item.count"
                @change="onchange(item.count, item.goodsId)"
                :data-id="item.goodsId"
              />
            </van-cell-group>
            <div slot="right" class="right">
              <van-button size="mini" type="danger" @click="deleteGood(item.goodsId)">删除</van-button>
            </div>
          </van-swipe-cell>
        </div>
    </div>
    <van-submit-bar :loading="submiting" :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>
    <div class="empty" v-show="!cartInfo.length">购物车空空如也</div>
    <div class="desc" v-show="cartInfo.length">滑动删除商品</div>
    <!-- <edit-address v-if="isEditing"></edit-address> -->
  </div>
</template>

<script>
// import Scroll from "@/common/components/scroll";
import UserService from "../service/user";
// import EditAddress from '@/components/orderConfirm/editAddress'
export default {
  components: {
    // Scroll
    // EditAddress
  },
  layout: "login",
  props: {},
  data() {
    return {
      cartInfo: [],
      isEmpty: true,
      submiting: false,
      isEditing: false
    };
  },
  computed: {
    totalPrice() {
      let totalP = 0;
      this.cartInfo.forEach(item => {
        totalP += item.price * item.count;
      });
      return totalP * 100;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  activated() {
    this.getShopcartInfo();
  },
  methods: {
    setDomHeight() {
      if (this.isEmpty) return;
      let height = window.screen.height;
      let dom = document.getElementsByClassName("hook")[0];
      dom.style.height = height - 60 - 46 + "px";
    },
    onchange(count, id) {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let index = cartInfo.findIndex(cart => cart.goodsId == id);
      cartInfo[index].count = count;
      localStorage.cartInfo = JSON.stringify(cartInfo);
    },
    deleteGood(id) {
      let cartInfo = JSON.parse(localStorage.cartInfo);
      let index = cartInfo.findIndex(item => item.goodsId == id);
      cartInfo.splice(index, 1);
      localStorage.cartInfo = JSON.stringify(cartInfo);
      this.cartInfo = JSON.parse(localStorage.cartInfo);
      console.log(this.cartInfo.length)
    },
    getShopcartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? false : true;
      // this.setDomHeight();
    },
    onClickLeft() {
      this.$router.back();
    },
    onSubmit() {
      // console.log('submit')
      if(this.cartInfo.length == 0) {
        this.$toast('请先选购商品')
        return
      }
      this.submiting = true;
      UserService._checkLogin().then(res => {
        this.submiting = false;
        if (res.status === 200) {
          if (res.data.code === 10) {
            this.$toast("请先登录");
            setTimeout(() => {
              this.$router.push("/login");
            }, 300);
            return;
          }
          if (res.data.code === 0) {
            this.$router.push("/confirmOrder");
          }
        } else {
          this.$toast("哪里出错了，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.container >>> .van-button
  background: #ff976a
  border: 1px solid #ff976a
.container
  background: #fff
  .scroll
    margin-top: 46px
    margin-bottom: 50px
    .item
      position: relative
      bottom-1px(#333)
      margin-top: 10px
      .right
        height: 100%
        .van-button--danger
          height: 100%
      .van-stepper
        position: absolute
        right: 10px
        bottom: 0.625rem
  .empty
    background: #f9f9f9
    font-size: 18px
    padding: 0px 10px
    margin: 50px 0px
    height: 100px
    line-height: 36px
  .van-button
    background: #ff976a
  .desc
    position: fixed
    top: 49%
    left: 0px
    right: 0px
    text-align: center
    opacity: 0.3
    font-size: 10px
  .shopcart-header
    position: fixed
    top: 0px
    left: 0px
    right: 0px
    z-index: 2000
</style>