 /* eslint-disable no-alert, no-console */
<template>
  <div class="m-footer">
    <van-row>
      <van-col span="6">
        <nuxt-link 
        class="span-column" 
        to="/home">
          <i 
          class="iconfont icon icon-shop"></i>
          <span>商城</span>
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link 
        class="span-column" 
        to="/category">
          <i 
          class="iconfont icon icon-cascades"></i>
          <span>分类</span>
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link 
        class="span-column" 
        to="/shopcart">
          <i 
          class="iconfont icon icon-cart"></i>
          <span>购物车</span>
        </nuxt-link>
      </van-col>
      <van-col span="6">
        <nuxt-link 
        class="span-column" 
        to="/user-center">
          <i 
          class="iconfont icon icon-my"></i>
          <span>会员中心</span>
        </nuxt-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
/* eslint-disable no-alert, no-console */
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl';

.m-footer {
  height: 3.75rem;
  width: 100%;
  background: $color-background;

  .van-row {
    height: 3.75rem;
    display: flex;
    align-items: center;
    color: $color-text;

    .span-column {
      display: flex;
      flex-direction: column;
      align-items: center
      font-size: 0.875rem;
      color: $color-text;

      &.nuxt-link-active {
        color: $color-theme;
      }

      .icon {
        font-size: 1.375rem;
        margin-bottom: 0.25rem;
      }
    }
  }
}
</style>
 /* eslint-disable no-alert, no-console */