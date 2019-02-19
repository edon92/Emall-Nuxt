<template>
  <div class="container">
    <div class="tab">
      <van-tabs v-model="active" sticky @click="onClick">
        <van-tab :title="item.MALL_CATEGORY_NAME" v-for="(item, index) in tabData" :key="index"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import GoodService from "../../service/good";
import axios from "axios";
export default {
  data() {
    return {
      tabData: null,
      active: 0,
      typeList: ["食品饮料", "个人护理", "营养奶品", "精选干货", "新鲜水果"]
    };
  },
  created() {
    GoodService._getCategory().then(res => {
      this.tabData = res.data.CategoryList.reverse();
      this.$emit("loadFinished");
      let loadType = this.$route.query.type;
      if (!loadType) {
        this.$emit("selectedType", 5);
      } else {

        let active = this.typeList.findIndex(item => item == loadType)
        this.$emit('selectedType', 5-active )
        this.active = active
      }
    });
  },
  methods: {
    onClick(index, title) {
      this.$emit("selectedType", 5 - index);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.container >>> .van-tab
  flex: 0%
.container >>> .van-tabs__line
  background-color: #ff976a
</style>
