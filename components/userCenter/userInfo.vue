<template lang="html">
    <div class="user-information">
      <div class="header border-bottom">
        <div class="header-left" @click="back">
          <i class="iconfont icon-jiantou"></i>
          <div class="msg">个人信息</div>
        </div>
      </div>
      <div class="information-content">
        <div class="text-line username border-bottom">
          <span class="text-label">用户名：</span>
          <input
           type="password"
           class="text-msg"
           :placeholder="username"
           style="background-color:#eee"
           ref="password1"
           disabled
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">电话号码：</span>
          <input
           type="password"
           class="text-msg"
           :placeholder="phone"
           style="background-color:#eee"
           ref="password2"
           disabled
          >
        </div>
      </div>
    </div>
</template>

<script>
import UserService from '@/service/user'
export default {
  data() {
    return {
      username: '',
      phone: ''
    };
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    back() {
      this.$emit('back')
    },
    submit() {
    },
    getInfo() {
      UserService._getUser().then(res => {
        if(res.status === 200) {
          if(res.data.code === 0) {
            this.username = res.data.user
            this.phone = res.data.phone
          }
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.user-information
  position: fixed
  top: 0px
  bottom: 0px
  left: 0px
  right: 0px
  // background: pink
  background: #eee
  z-index: 200
  .header
    padding: 0px 10px
    height: 44px
    font-size: 0px
    background: #f9f9f9
    font-weight: 350
    color: #000
    &::before
      border-color: #ccc
    .header-left
      font-size: 16px
      line-height: 44px
      // color: #999
      .iconfont
        font-size: 14px
      .msg
        margin-left: 50%
        transform: translate3d(-50%, 0, 0)
        display: inline-block
  .information-content
    margin-top: 2px
    padding: 10px
    font-size: 16px
    color: $color-text
    .avatar-content
      padding: 30px 10px 10px 20px
      font-size: 0px
      &::before
        border-color: #ccc
      .avatar
        display: inline-block
        img
          border-radius: 50%
      .username
        display: inline-block
        font-size: 14px
        margin-left: 30px
    .text-line
      height: 44px
      line-height: 44px
      font-size: 14px
      color: #999
      input::-webkit-input-placeholder
        color: #ccc
      &::before
        border-color: #ccc
  .edit
    margin: 0 auto
    width: 100px
    height: 30px
    background: rgba(248,118,44,.6)
    border-radius: 10px
    text-align: center
    line-height: 30px
    color: #fff
  .text-msg
    color: #444
</style>
