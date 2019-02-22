<template lang="html">
  <div class="container">
    <div class="header">
      <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="icon-container">
      <div class="icon" v-for="(item,index) in icons" :key="index" @click="handleClick(item.name)">
        <div class="box">
          <van-icon :name="item.iconName" />
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="contact item">
      <van-cell title="联系客服" is-link />
    </div>
    <div class="setting item" @click="clickSetting">
      <van-cell title="设置" is-link />
    </div>    
    <div class="setting-child item">
      <van-actionsheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
      />
    </div>    
    <van-popup v-model="showPassword" position="right" :overlay="false" class="password">
      <password-com @back="closePass"></password-com>
    </van-popup>
    <van-popup v-model="showUserInfo" position="right" :overlay="false" class="password">
      <user-info @back="closeInfo"></user-info>
    </van-popup>
  </div>
</template> 

<script>
import UserService from "../service/user";
import PasswordCom from "@/components/userCenter/passwordUpdate";
import UserInfo from "@/components/userCenter/userInfo";
export default {
  layout: "login",
  data() {
    return {
      show: false,
      showPassword: false,
      showUserInfo: false,
      actions: [
        {
          name: "修改密码"
        },
        {
          name: "退出登录"
        }
      ],
      icons: [
        {
          name: "购物车",
          iconName: "cart-o"
        },
        {
          name: "订单历史",
          iconName: "orders-o"
        },
        { name: "个人信息", iconName: "contact" },
        { name: "消费维权", iconName: "smile-o" }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    closePass() {
      this.showPassword = false;
    },
    clickSetting() {
      this.show = true;
    },
    onSelect(e) {
      if (e.name == "退出登录") {
        this.clickLogout();
      }
      if (e.name == "修改密码") {
        this.checkLogin();
      }
    },
    checkLogin() {
      UserService._checkLogin().then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.showPassword = true;
          } else {
            this.$toast("请先登录");
          }
        }
      });
    },
    closeInfo() {
      this.showUserInfo = false;
    },
    clickLogout() {
      UserService._logout().then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.$toast("退出成功");
            this.$router.push("/home");
          } else {
            this.$toast("请先登录");
          }
        }
      });
    },
    handleClick(type) {
      this.show = false;
      if (type.indexOf("购物车") == 0) {
        this.$router.push("/shopcart");
      }
      if (type.indexOf("订单") == 0) {
        UserService._checkLogin().then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$router.push("/orderList");
            } else {
              this.$toast("请先登录");
            }
          }
        });
      }
      if (type.indexOf("消费") == 0) {
        this.$toast("暂不开通此版块");
      }
      if (type.indexOf("个人") == 0) {
        UserService._checkLogin().then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.showUserInfo = true;
            } else {
              this.$toast("请先登录");
            }
          }
        });
      }
    }
  },
  components: {
    PasswordCom,
    UserInfo
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.container
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: #eee
  .icon-container
    width: 100%
    display: flex
    flex-wrap: nowrap
    justify-content: space-between
    background: #fff
    font-weight: 200
    .icon
      text-align: center
      padding: 15px 10px
      font-size: 14px
      color: #888
      .box
        display: flex
        align-items: center
        justify-content: center
        margin: 0 auto
        height: 35px
        width: 35px
        background: #eee
        line-height: 35px
        border-radius: 50%
        i
          font-size: 22px
          line-height: 22px
      .name
        margin-top: 10px
  .item
    margin-top: 10px
    .van-cell
      color: #888
  .password
    position: fixed
    left: 0px
    right: 0px
    height: 100%
    z-index: 4000
    // @media only screen and (max-height: 568px)
    //   top: 5.5%
    //  @media only screen and (max-height: 736px)
    //   top: 15%
</style>
