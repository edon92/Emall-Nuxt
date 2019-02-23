<template>
  <slide>
    <div class="app">
      <div class="header">
        <m-header/>
      </div>
      <div class="home-container" ref="wrapper">
        <div>
          <div class="swiepr">
            <swiper :bannerPicArray="HomeData.slides"></swiper>
          </div>
          <div class="h-catogory">
            <h-catogory :Hcatogory="HomeData.category"></h-catogory>
          </div>
          <div class="ad">
            <advertisement :advertesPicture="HomeData.advertesPicture"></advertisement>
          </div>
          <div class="recommend">
            <recommend :recommendList="HomeData.recommend"></recommend>
          </div>
          <div class="floor1">
            <floor-one
              :floorData="HomeData.floor1"
              :floorName="HomeData.floorName.floor1"
              :floorNumber="1"
            ></floor-one>
          </div>
          <div class="floor2">
            <floor-one
              :floorData="HomeData.floor2"
              :floorName="HomeData.floorName.floor2"
              :floorNumber="2"
            ></floor-one>
          </div>
          <div class="floor3">
            <floor-one
              :floorData="HomeData.floor3"
              :floorName="HomeData.floorName.floor3"
              :floorNumber="3"
            ></floor-one>
          </div>
          <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
              <van-list>
                <van-row gutter="20">
                  <van-col span="12" v-for="(item , index) in HomeData.hotGoods" :key="index">
                    <goods-info
                      :goodsId="item.goodsId"
                      :goodsImage="item.image"
                      :goodsName="item.name"
                      :goodsPrice="item.price"
                      class="good"
                    ></goods-info>
                  </van-col>
                </van-row>
              </van-list>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-show="showLoading">
        <van-loading type="spinner"/>
      </div>
    </div>
  </slide>
</template>

<script>
import MHeader from "@/components/header/MHeader";
import Swiper from "@/components/swiper/swiper";
import Slide from "@/common/components/slide";
import HCatogory from "@/components/home/HCatogory";
import Recommend from "@/components/home/recommend";
import Advertisement from "@/components/home/advertisement";
import goodsInfo from "@/components/home/goodsInfo";
import FloorOne from "@/components/home/floor1";
import axios from "axios";
// import Bscroll from "better-scroll";
import UserService from "../service/user";
import GoodService from "../service/good";
export default {
  components: {
    MHeader,
    Slide,
    Swiper,
    HCatogory,
    Recommend,
    Advertisement,
    FloorOne,
    goodsInfo
  },
  props: {},
  data() {
    return {
      scroll: null,
      user: "",
      showLoading: false
    };
  },
  computed: {},
  watch: {},
  async asyncData() {
    let {
      status,
      data: { data }
      // 之类发布的时候要改掉
    } = await axios.get("http://127.0.0.1:3000/good/homeData");
    if (status === 200) {
      return {
        HomeData: data
      };
    }
  },
  created() {},
  mounted() {
    // this.setDomHeight()
    // this._initialScroll();
  },
  methods: {
    setDomHeight() {
      let height = window.screen.height;
      this.$refs.wrapper.style.height = height - 60 - 45 + "px";
    },
    _initialScroll() {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.app
  min-height: 100%
  .header
    position: fixed
    left: 0
    right: 0
    top: 0
    height: 3rem
    z-index: 10
  .home-container
    margin-top: 3rem
    padding-bottom: 60px
  .h-catogory
    padding: 0.5rem 0.3125rem
  .ad
    width: 100%
  .recommend
    margin-top: 0.625rem
  .hot-area
    text-align: center
    font-size: 14px
    .hot-title
      display: flex
      flex-direction: row
      height: 2rem
      justify-content: center
      align-items: center
      color: $color-theme
      font-size: 16px
    .hot-goods
      overflow: hidden
      background-color: #fff
      padding-top: 0.3125rem
      .good
        margin-top: 0.625rem
.loading
  position: fixed
  top: 50%
  left: 50%
  margin-top: -0.5rem
  margin-left: -0.5rem
</style>
