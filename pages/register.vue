<template>
  <div class="container">
    <div class="title">
      <van-nav-bar
        title="E-mall注册"
        left-text="返回"
        right-text="回到首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="login">
      <van-cell-group :border="false">
        <van-field
          v-model="username"
          :required="reqUser"
          clearable
          label="用户名"
          class="line"
          :error-message="errUser"
          :border="false"
          placeholder="请输入用户名"
          @blur="checkUsername"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :required="reqPass"
          :border="false"
          class="line"
          :error-message="errPass"
          @blur="checkPassword"
        />
        <van-field
          v-model="passwordConfirm"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          :required="reqPass2"
          :border="false"
          class="line"
          :error-message="errPass2"
          @blur="checkPassword2"
        />
        <van-field
          v-model="phoneNum"
          label="手机号码"
          placeholder="请输入手机号码"
          :required="reqNum"
          :border="false"
          class="line"
          @blur="checkPhone"
          :error-message="errNum"
        />
        <van-cell-group :border="false">
          <van-field
            :required="reqCode"
            v-model="code"
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            class="line"
            @blur="checkCode"
            :error-message="errCode"
          >
            <van-button slot="button" size="small" type="primary" @click="sendVerifyCode">发送验证码</van-button>
          </van-field>
        </van-cell-group>
      </van-cell-group>
      <van-button class="dologin" type="warning" :block="true" @click="register">立即注册</van-button>
      <div class="register-box">
        <span class="register" @click="toLogin">>>去登录</span>
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
export default {
  layout: "login",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      phoneNum: "",
      code: "",
      errUser: "",
      errPass: "",
      errPass2: "",
      errNum: "",
      errCode: "",
      reqUser: true,
      reqPass: true,
      reqPass2: true,
      reqNum: true,
      reqCode: true,
      showLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push("/home");
    },
    toLogin() {
      this.$router.back();
    },
    checkUsername() {
      if (!_mm.validate(this.username)) {
        this.errUser = "用户名不能为空";
        this.reqUser = true;
      } else {
        this.errUser = "";
        this.reqUser = false;
      }
      // 然后去检查数据库
      UserService._checkUser(this.username).then(res => {
        if(res.data.code === 0) {
          this.errUser = res.data.msg
        }
      })
    },
    checkPassword() {
      if (this.password.length < 5) {
        this.errPass = "密码不能小于5位";
        this.reqPass = true;
      } else {
        this.errPass = "";
        this.reqPass = false;
      }
    },
    checkPassword2() {
      if (this.passwordConfirm !== this.password) {
        this.errPass2 = "两次输入的密码不一致";
        this.reqPass2 = true;
      } else {
        this.errPass2 = "";
        this.reqPass2 = false;
      }
    },
    checkPhone() {
      if (!_mm.validate(this.phoneNum, "phone")) {
        this.errNum = "手机号码有误";
        this.reqNum = true;
      } else {
        this.errNum = "";
        this.reqNum = false;
      }
    },
    checkCode() {
      if (!_mm.validate(this.code)) {
        this.errCode = "验证码不能为空";
        this.reqCode = true;
      } else {
        this.errCode = "";
        this.reqCode = false;
      }
    },
    sendVerifyCode() {
      if(!_mm.validate(this.phoneNum, "phone")) return
      this.showLoading = !this.showLoading;
      UserService._sednMsg(this.phoneNum).then(res => {
        if (res.data.code === 0) {
          this.showLoading = false;
          this.$toast(res.data.msg);
        }
        if (res.data.code === -1) {
          this.$toast(res.data.msg);
          this.showLoading = false;
        }
      });
    },
    isEmpty() {
      return (
        !this.username ||
        !this.password ||
        !this.passwordConfirm ||
        !this.code ||
        !this.phoneNum
      );
    },
    register() {
      this.showLoading = true
      if (this.isEmpty()) {
        return;
      }
      //请求服务器
      UserService._register(this.username,this.password,this.phoneNum,this.code).then(res => {
        if(res.data.code ===0) {
          this.showLoading = false
          this.$toast(res.data.msg)
          this.$router.push('/login')
        }
        if(res.data.code === -1) {
          this.showLoading = false
          this.$toast(res.data.msg)
        }
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.container >>> .van-nav-bar__right
  .van-nav-bar__text
    color: #888
.container
  display: flex
  flex-direction: column
  min-height: 100%
  .login
    margin-top: 2rem
    padding: 0 0.625rem
    .line
      height: 4.25rem
    .dologin
      margin-top: 0.625rem
    .register-box
      margin-top: 1rem
      margin-right: 0.25rem
      color: #999
      text-align: right
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
</style>