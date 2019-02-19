<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="noAddress" v-if="!hasAddress">
      <!-- <van-cell title="点击添加地址" is-link arrow-direction="right" value="内容" /> -->
      <van-cell title="选择 / 添加地址" is-link @click="_changeShowAdssressList()"/>
    </div>
    <div class="address" v-else>
      <van-address-list v-model="chosenAddressId" :list="list.slice(0,2)" @edit="onEdit"/>
      <van-button
        @click="_changeShowAdssressList('notEdit')"
        class="add-address"
        type="warning"
        size="mini"
      >显示更多 / 添加地址</van-button>
      <div class="desc">店铺名称: Emall</div>
    </div>
    <scroll class="scroll hook" ref="wrapper">
      <div>
        <div class="item" v-for="(item, index) in cartInfo" :key="index">
          <van-card
            :num="item.count"
            :price="item.price.toFixed(2)"
            :desc="item.remark.message_0"
            :title="item.name"
            :thumb="item.image"
          />
        </div>
      </div>
    </scroll>
    <van-submit-bar
      :price="totalPrice"
      button-text="确认支付"
      @submit="onPayment"
      button-type="warning"
    />

    <van-popup v-model="isEditing" position="right" :overlay="false" class="newpage editAdress">
      <div class="Adress">
        <edit-address
          :addressInfo="selectedAddress"
          @back="_changeIsEditing"
          @hasChangeAdd="hasChangeAdd"
          :isEditingPage="isEditPage"
        ></edit-address>
      </div>
    </van-popup>
    <van-popup
      v-model="showAddressList"
      position="right"
      :overlay="false"
      class="newpage AdressList"
    >
      <div class="Adress">
        <address-list
          @back="_changeShowAdssressList"
          @onAdd="toEditPage"
          :addressList="list"
          @onEdit="onEdit"
        ></address-list>
      </div>
    </van-popup>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner"/>
    </div>
  </div>
</template>

<script>
import Scroll from "@/common/components/scroll";
import EditAddress from "@/components/orderConfirm/editAddress";
import AddressList from "@/components/orderConfirm/addressList";
import OrderService from "@/service/order";
export default {
  components: {
    Scroll,
    EditAddress,
    AddressList
  },
  props: {},
  data() {
    return {
      hasAddress: false,
      chosenAddressId: "",
      cartInfo: [],
      isEditing: false,
      showAddressList: false,
      selectedAddress: {},
      // list从后端获得
      list: [],
      isEditPage: false,
      showLoading: false
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
  mounted() {
    this.getCartInfo();
    this.setDomHeight();
    this.getAddress();
  },
  activated() {},
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
    },
    hasChangeAdd() {
      this.isEditing = false;
      this.getAddress();
    },
    getAddress() {
      OrderService._getAddress().then(res => {
        if (res.status === 200) {
          if (res.data.code === 10) {
            this.$toast("请先登录");
            return;
          }
          if (res.data.code === 0) {
            this.list = res.data.addressList;
            this.hasAddress = this.list.length > 0 ? true : false;
          }
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    toEditPage() {
      this.isEditing = true;
    },
    _changeIsEditing() {
      this.isEditing = false;
    },
    _changeShowAdssressList(type) {
      this.isEditPage = false;
      this.showAddressList = !this.showAddressList;
    },
    //如果没选地址，不让支付
    onPayment() {
      if (typeof(this.chosenAddressId) !== 'number') {
        this.$toast("请选择地址");
        return;
      }
      //把获得的OrderInfo传到后端，然后回调中跳转支付页面
      this.showLoading = true
      OrderService._createOrder(this._getOrderInfo()).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.showLoading = false
            localStorage.removeItem('cartInfo')
            this.$toast("创建订单成功，正在跳转到支付页");
            setTimeout(() => {
              this.$router.push("/payment");
            }, 300);
          }
        }
      }).catch((err) => {
        this.showLoading = false
      })
    },
    //汇总地址和订单信息，作提交用
    _getOrderInfo() {
      let OrderInfo = {
        selectedAddress: this.list[this.chosenAddressId],
        goodsList: this.cartInfo
      };
      return JSON.stringify(OrderInfo);
    },
    onEdit(item, index) {
      this.selectedAddress = item;
      this.isEditing = true;
      this.isEditPage = true;
      // this.$router.push("/editAddress");
    },
    setDomHeight() {
      let height = window.screen.height;
      let dom = document.getElementsByClassName("hook")[0];
      let headerHeight = document.getElementsByClassName("header")[0].style
        .height;
      // let addressHeight = document.getElementsByClassName("address")[0].style.height
      // let vanSubmitBarHeight = document.getElementsByClassName("van-submit-bar")[0].style.height
      dom.style.height = height - 46 - 50 - 180 - 50 + "px";
    }
  }
};
</script>
<style lang="stylus" scoped>
// .container >>> .van-address-list__add
// display: none
.container >>> .van-address-list
  padding-bottom: 0
.container
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 50px
  overflow: hidden
  .address
    position: relative
    z-index: 99
    .add-address
      width: 100%
      text-align: center
      font-size: 14px
      color: #fff
      // opacity: 0.7
      background: #fea88e
      // border: none
  .desc
    font-size: 14px
    height: 40px
    line-height: 40px
    text-align: left
    padding-left: 20px
    color: #666
    border-bottom: 1px solid #eee
    background: #fff
  .scroll
    magin-bottom: 50px
  .newpage
    position: fixed
    left: 0px
    right: 0px
    height: 100%
  .editAdress
    z-index: 4000
  .noAddress
    border-bottom: 2px dashed #f8762c
    position: relative
    z-index: 1000
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
</style>
