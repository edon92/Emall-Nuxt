
<template>
  <div class="container">
    <div class="title">商品推荐</div>
    <van-swipe indicator-color="#f8762c">
      <van-swipe-item v-for="(item, index) in pages" :key="index">
        <div
          class="good hook"
          v-for="(good, index) in item"
          :key="index"
          @touchmove="handleTouchMove"
          @touchstart="handleTouchStart"
          @click="ToDetail(good.goodsId)"
        >
          <img v-lazy="good.image" class="item-img">
          <div class="item-name">{{good.goodsName}}</div>
          <div class="tag">推荐</div>
          <div class="price">
            <div class="item-price">￥{{good.mallPrice}}</div>
            <div class="item-price-line">￥{{(good.mallPrice + 3).toFixed(2) }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          setWrapperSize: true,
          autoPlay: 3000,
          loop: true,
          autoplayDisableOnInterraction: false
        }
        // some swiper options...
      },
      ifDrag: false,
      timer: null
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.recommendList.forEach((item, index) => {
        let page = Math.floor(index / 3);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    ToDetail(goodsId) {
      if(this.ifDrag) return
      this.$router.push(`/detail?goodsId=${goodsId}`);
    },
    handleTouchStart() {
      if(!this.ifDrag) return
      this.ifDrag = false
    },
    handleTouchMove() {
      this.ifDrag = true
    }
  }
};
</script>
<style lang="stylus" scoped>

@import '~assets/stylus/variable.styl'
.container >>> .van-swipe__indicator
  background: #f9b496
.container >>> .van-swipe__indicators
  bottom: 0.1875rem
.container
  display: flex
  flex-direction: column
  width: 100%
  background: #fff
  .title
    padding: 0.25rem 0.25rem
    color: $color-theme
    font-size: 1rem
    border-bottom: 1px solid #eee
  .van-swipe
    height: 10rem
    .van-swipe-item
      width: 100%
      display: flex
      overflow: hidden
      flex-direction: row
      .good
        position: relative
        display: flex
        overflow: hidden
        flex-direction: column
        justify-content: center
        align-items: center
        height: 10rem
        width: 33.333%
        border-right: 1px solid #eee
        box-sizing: border-box
        .tag
          position: absolute
          height: 1rem
          line-height: 1rem
          margin-top: -0.5rem
          top: 10%
          left: 4%
          width: 30px
          background: #c60023
          color: #fff
          border-radius: 0.25rem
          opacity: 0.6
          text-align: center
          font-size: 10px
        .item-img
          max-width: 7rem
          height: 7rem
        .item-name
          padding: 0rem 0.25rem
          width: 100%
          box-sizing: border-box
          text-align: center
          font-size: 12px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
        .price
          display: flex
          margin-top: 0.25rem
          color: #c60023
          .item-price
            font-size: 0.9375rem
          .item-price-line
            position: relative
            top: 3px
            right: -17px
            color: #888
            text-decoration: line-through
            font-size: 12px
</style>