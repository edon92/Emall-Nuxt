<template>
  <div class="container">
    <div class="title">
      <van-nav-bar title="E-Mall登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="login">
      <van-cell-group :border="false">
        <van-field
          v-model="username"
          :required="reqUser"
          clearable
          label="用户名"
          class="username"
          :error-message="errUser"
          :border="false"
          @blur="checkUsername"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          class="password"
          :error-message="errPass"
        >
          <span slot="button" @click="resetPassword" style="color: #ccc">| 忘记密码</span>
        </van-field>
      </van-cell-group>
      <!-- <van-button class="dologin" type="primary" :block="true">登录</van-button> -->
      <van-button class="dologin" type="warning" :block="true" @click="login">登录</van-button>
      <div class="register-box">
        <span class="register" @click="toRegister">立即注册</span>
      </div>
    </div>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner" color="#f8762c"/>
    </div>
  </div>
</template>

<script>
import _mm from "../common/js/mm";
import UserService from "../service/user";
import CryptoJS from "crypto-js";
export default {
  layout: "login",
  components: {},
  props: {},
  data() {
    return {
      username: "mmxdxlok",
      password: "laixiaol",
      errUser: "",
      errPass: "",
      reqUser: true,
      showLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    resetPassword() {
    },
    toRegister() {
      this.$router.push("/register");
    },
    checkUsername() {
      if (!_mm.validate(this.username)) {
        this.errUser = "用户名不能为空";
        this.reqUser = true;
      } else {
        this.errUser = "";
        this.reqUser = false;
      }
    },
    login() {
      // 请求服务器登录接口
      if (!this.username || !this.password) return;
      this.showLoading = !this.showLoading;
      UserService._doLogin(this.username, this.password).then(res => {
        if (res.data.code === 0) {
          this.showLoading = !this.showLoading;
          this.$toast(res.data.msg);
          this.$router.push("/home");
        } else {
          this.showLoading = !this.showLoading;
          this.$toast(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  display: flex
  flex-direction: column
  min-height: 100%
  .login
    margin-top: 2rem
    padding: 0 0.625rem
    .password
      height: 4.25rem
    .username
      height: 4.25rem
    .dologin
      margin-top: 0.625rem
    .register-box
      margin-top: 1rem
      margin-right: 0.25rem
      color: #999
      text-align: right
      .register
        font-size: 12px
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
</style>