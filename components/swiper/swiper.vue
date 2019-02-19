<template>
  <div class="swiper">
    <van-swipe :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="(item, key) in bannerPicArray" :key="key">
        <img
          :src="item.image"
          class="swiperImg"
          @click="ToDetail(item.goodsId)"
          @touchmove="handleTouchMove"
          @touchstart="handleTouchStart"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    bannerPicArray: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ToDetail(goodsId) {
      if(this.ifDrag) return
      this.$router.push(`/detail?goodsId=${goodsId}`);
    },
    handleTouchStart() {
      if (!this.ifDrag) return;
      this.ifDrag = false;
    },
    handleTouchMove() {
      this.ifDrag = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-swipe
  // width: 25.875rem
  // max-width: 100%
  height: 10rem
  .swiperImg
    min-width: 100%
    height: 10rem
    @media only screen and (min-width: 568px)
      width: 100%
</style>