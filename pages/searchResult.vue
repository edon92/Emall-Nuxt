<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="4">
          <i class="iconfont icon-jiantou span-column" @click="back"></i>
        </van-col>
        <van-col span="16">
          <search-bar></search-bar>
        </van-col>
      </van-row>
    </div>
    <div class="search-detail" v-if="resultList.length">
      <div class="good" v-for="(item, index) in resultList" :key="index" @click="toDetail(item.ID)">
        <van-card
          :price="item.PRESENT_PRICE" 
          desc="特价优惠" 
          :title="item.NAME" 
          :thumb="item.IMAGE1"/>
      </div>
    </div>
    <div class="search-detail" v-if="!resultList.length">
      <div class="good" style="padding: 30px 30px">
        没有找到任何结果
      </div>
    </div>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner"/>
    </div>
  </div>
</template>

<script>
import GoodModle from "@/service/good";
import SearchBar from "@/components/header/searchBar";
export default {
  components: {
    SearchBar
  },
  props: {},
  data() {
    return {
      showLoading: true,
      resultList: []
    };
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {
    this._initailData();
  },
  methods: {
    back() {
      this.$router.back();
    },
    toDetail(id) {
      this.$router.push(`/detail?goodsId=${id}`)
    },
    _initailData() {
      GoodModle._searchByKeyword(this.$route.query.keyword).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.resultList = res.data.data;
          }
        }
        this.showLoading = false;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
.container
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
  .header
    position: fixed
    top: 0px
    left: 0px
    right: 0px
    z-index: 100
    display: flex
    align-items: center
    // text-align: center
    height: 3rem
    background: #ff976a
    color: $color-background
    .van-row
      display: flex
      width: 100%
      align-items: center
      .van-col--4
        height: 100%
        .span-column
          display: flex
          align-items: center
          flex-direction: column
          font-size: 1.125rem
          &.login
            font-size: 0.875rem
      .van-col--12
        height: 3rem
        display: flex
        align-items: center
  .search-detail
    margin-top: 50px
    margin-bottom: 66px
    .good
      padding: 4px 0px
      bottom-1px(#eee)
</style>