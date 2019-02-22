<template>
  <div class="goods-info" >
    <div class="goods-image">
      <img v-lazy="goodsImage"  @click="goGoodsPage()" width="90%" class="good" onerror="alert('The image could not be loaded.')"/>
    </div>
    <div class="goods-name" @click="goGoodsPage()">{{goodsName}}</div>
    <div class="goods-price" @click="goGoodsPage()">￥{{goodsPrice.toFixed(2)}}</div>
  </div>
</template>

<script>
export default {
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  data() {
    return {
      errorImg: 'this.src="' + require('@/assets/images/logo.png') + '"'
    };
  },
  methods: {
    goGoodsPage() {
      this.$router.push(`/detail?goodsId=${this.goodsId}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
.goods-image
  margin-bottom: 5px
  overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 100%
  .good
    border: 1px solid #eee
.goods-name
  padding: 0 8px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  font-size: 12px
.goods-price
  margin-top: 5px
  color: #f8762c
  font-size: 16px
</style>