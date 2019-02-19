<template>
  <div class="searchBar">
    <van-search
      placeholder="奶茶"
      v-model="value"
      @cancel="onCancel"
      @search="onSearch"
      @focus="onFocus"
      style="background:none"
    />
  </div>
</template>

<script>
import GoodModle from "@/service/good";
export default {
  components: {},
  props: {},
  data() {
    return {
      value: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.$route.query.keyword) {
      this.value = this.$route.query.keyword;
    }
  },
  methods: {
    onCancel() {
      console.log("cancle");
    },
    onFocus() {
      this.value = "奶茶";
    },
    onSearch() {
      // GoodModle._searchByKeyword(this.value).then(res => {
      //   console.log(res)
      // })
      if (this.value) {
        console.log(this.$route.path);
        this.$router.push(`/searchResult?keyword=${this.value}`);
        if (this.$route.path === "/searchResult") {
          window.location.reload()
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.searchBar >>> .van-cell
  border-radius: 0.8rem
.searchBar >>> .van-cell__value
  display: flex
</style>