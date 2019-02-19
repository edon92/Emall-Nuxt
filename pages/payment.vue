<template lang="html">
    <div class="payment">
      <nuxt-link tag="div" to="/home" class="home">
        <i class="iconfont icon-houtui">返回商城</i>
      </nuxt-link>
      <div class="header">订单提交成功，请您尽快支付！ 订单号：{{orderNumber}}</div>
      <div class="subtitle">请使用支付宝扫描如下二维码进行支付：</div>
      <div class="pay-img">
        <img src="../assets/images/payment.png" alt="">
      </div>
    </div>
</template>

<script>
export default {
  props: {
    orderNumber: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.payment
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: #f9f9f9
  z-index: 99
  display: flex
  flex-direction: column
  justify-content: center
  text-align: center
  .home
    position: fixed
    top: 0.4rem
    left: 0.4rem
    color: #777
  .header
    padding: 10px
    font-size: 14px
    font-weight: 700
    color: #666
  .subtitle
    color: #c60023 !important
    padding: 10px
    font-size: 18px
    font-weight: 700
    color: #666
</style>
