<template>
  <div class="category">
    <div class="tabs">
      <e-tab @loadFinished="loadData" @selectedType="loadType"></e-tab>
    </div>
    <div class="items-scroll" ref="wrapper">
      <div>
        <div class="items">
          <div
            class="item border-bottom"
            v-for="(item,index) in CategorySubList"
            :key="index"
            :class="{'active': keyword===item.MALL_SUB_NAME}"
            @click="selectItem(item)"
          >{{item.MALL_SUB_NAME}}</div>
        </div>
      </div>
    </div>
    <scroll class="goods hook" ref="wrapper2" :pullup="true" @scrollToEnd="scrollToEnd">
      <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-row>
              <van-col span="12" v-for="(item , index) in list" :key="index">
                <goods-info
                  :goodsId="item.ID"
                  :goodsImage="item.IMAGE1"
                  :goodsName="item.NAME"
                  :goodsPrice="item.PRESENT_PRICE"
                  class="good"
                ></goods-info>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
    </scroll>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner"/>
    </div>
    <div class="loading2" v-show="showLoadingGoods" ref="loading2">
      <van-loading type="spinner" color="#f8762c"/>
    </div>
  </div>
</template>

<script>
import ETab from "@/components/category/ETab";
import Bscroll from "better-scroll";
import GoodsService from "../service/good";
import Scroll from "@/common/components/scroll";
import goodsInfo from "@/components/home/goodsInfo";
export default {
  components: {
    ETab,
    Scroll,
    goodsInfo
  },
  props: {},
  data() {
    return {
      showLoading: true,
      showLoadingGood: true,
      keyword: "",
      scroll: null,
      scroll2: null,
      CategorySubList: [],
      finished: false,
      loading: false,
      isLoading: false,
      list: [],
      page: 1,
      showLoadingGoods: false,
      maxPage: 0,
      isRefresh: false,
      currentId: 0
    };
  },
  computed: {},
  watch: {
    keyword(val) {
      if (val === this.keyword) return;
    }
  },
  created() {},
  mounted() {
    this._initialScroll();
    this._calulateLoadingPosition();
  },
  methods: {
    _calulateLoadingPosition() {
      let dom = document.getElementsByClassName("hook")[0];
      let width = dom.clientWidth;
      let height = dom.clientHeight;
      let lodingDom = this.$refs.loading2;
      lodingDom.style.left = width / 2 + 80 + "px";
      lodingDom.style.top = height / 2 + "px";
      lodingDom.style.marginLeft = "-15px";
      lodingDom.style.marginTop = "15px";
    },
    loadData() {
      this.showLoading = false;
    },
    // 下拉刷新执行函数
    onRefresh() {
      // this.list = []
      // this.page = 1
      this.isRefresh = true;
      this.isLoading = true;
      // this.loadGoodsFromSub(this.currentId,this.page)
      setTimeout(() => {
        this.isLoading = false;
        this.isRefresh = false;
      }, 1000);
    },
    // this.loading = false会执行的函数
    onLoad() {
      // console.log("vant onload");
      // this.loading = false;
    },
    // better-scroll 滚动到底部回调
    scrollToEnd() {
      this.page++;
      this.loading = true;
      this.showLoadingGoods = true;
      console.log(this.page);
      if (this.page >= this.maxPage) {
        this.finished = true;
        this.loading = false;
        this.showLoadingGoods = false;
        return;
      }
      this.loadGoodsFromSub(this.currentId, this.page);
      this.loading = false;
      // this.$toast('加载成功')
    },
    // 加载 大分类下的小类
    loadType(id) {
      console.log(id);
      this.page = 1;
      this.isRefresh = true;
      GoodsService._getCategorySubList(id).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.list = [];
          this.CategorySubList = res.data.CategorySubList;
          this.keyword = this.CategorySubList[0].MALL_SUB_NAME;
          this.currentId = this.CategorySubList[0].ID;
          console.log("Sub", this.CategorySubList, this.currentId);
          // this.maxPage =
          this.loadGoodsFromSub(this.currentId, this.page);
        }
      });
    },
    // 点击侧边小类
    selectItem(item) {
      this.list = [];
      this.page = 1;
      this.keyword = item.MALL_SUB_NAME;
      // console.log("selectItem", item.MALL_SUB_NAME, item.ID);
      this.currentId = item.ID;
      this.loadGoodsFromSub(this.currentId, this.page);
    },
    loadGoodsFromSub(id, page) {
      this.finished = false;
      if (!this.isRefresh) {
        this.showLoadingGoods = true;
      }
      GoodsService._getGoodsList(id, page).then(res => {
        this.showLoadingGoods = false;
        this.isRefresh = false;
        let timer = setTimeout(() => {
          this.isLoading = false;
        }, 500);
        this.maxPage = res.data.maxPage;
        if (this.page === this.maxPage || this.maxPage === 0) {
          this.finished = true;
          this.loading = false;
        }
        if (res.status === 200) {
          res.data.goodsList.map(item => {
            this.list.push(item);
          });
          if (this.loading) {
            this.loading = false;
          }
        }
      });
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
.category >>> .van-pull-refresh
  @media only screen and (min-width: 568px)
    width: 225px
.category
  position: fixed
  width: 100%
  top: 0
  bottom: 3.75rem
  display: flex
  // flex-direction:
  .tabs
    position: absolute
    top: 0px
    left: 0px
    right: 0px
  .items-scroll
    position: relative
    flex: 0 0 80px
    top: 0px
    left: 0px
    bottom: 43px
    margin-top: 2.75rem
    overflow: hidden
    background: #fbfbfb
    z-index: 200
    .items
      flex: 0 0 80px
      width: 80px
      background: #eee
      color: $color-text
      .item
        text-align: center
        height: 50px
        line-height: 50px
        &:before
          border-color: #ccc
        &.active
          background: #fff
  .goods
    // position: relative
    // overflow: scroll
    // margin: 0px 6px
    // margin-top: 2.75rem
    margin-top: 3.375rem
    // padding-left: 10px
    padding: 0px 0px 0px 14px
    box-sizing: border-box
    flex: 1
    .van-pull-refresh
      @media only screen and (min-width: 567px)
        width: 225px
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
  .loading2
    position: fixed
    // top: 16.21875rem
    // left: 55%
    // margin-top: -0.5rem
    // margin-left: -0.5rem
</style>