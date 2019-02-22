<template>
  <div class="header">
    <van-row>
      <van-col span="4">
        <i class="iconfont icon-fenlei span-column" @click="ToCatogory"></i>
      </van-col>
      <van-col span="16">
        <search-bar></search-bar>
      </van-col>
      <van-col span="4">
        <span class="span-column login" @click="ToLogin" v-if="!user">登录</span>
        <span class="span-column login" @click="logout" v-else>退出</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import SearchBar from "./searchBar";
import UserService from "../../service/user";
export default {
  components: {
    SearchBar
  },
  props: {},
  data() {
    return {
      user: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    UserService._getUser().then(res => {
      if (res.data.code === 0) {
        this.user = res.data.user;
      }
    });
  },
  methods: {
    ToCatogory() {
      this.$router.push("./category");
    },
    ToLogin() {
      this.$router.push("./login");
    },
    logout() {
      UserService._logout().then(res => {
        if(res.data.code === 0 ) {
          this.$toast(res.data.msg);
          window.location.href = "http://www.edon-plus.com"; 
        }
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.header
  display: flex
  align-items: center
  // text-align: center
  height: 3rem
  background: $color-theme
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
</style>