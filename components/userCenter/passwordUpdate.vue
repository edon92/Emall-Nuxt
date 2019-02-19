<template lang="html">
    <div class="user-information">
      <div class="header border-bottom">
        <div class="header-left" @click="back">
          <i class="iconfont icon-jiantou"></i>
          <div class="msg">修改密码</div>
        </div>
      </div>
      <div class="information-content">
        <div class="text-line username border-bottom">
          <span class="text-label">原密码：</span>
          <input
           type="password"
           class="text-msg"
           placeholder="请输入原密码"
           style="background-color:#eee"
           ref="password1"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">新密码：</span>
          <input
           type="password"
           class="text-msg"
           placeholder="请输入新密码"
           style="background-color:#eee"
           ref="password2"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">确认密码：</span>
          <input
           type="password"
           class="text-msg inputSth"
           placeholder="请再次输入密码"
           style="background-color:#eee"
           ref="password3"
          >
        </div>
      </div>
      <div class="edit" @click.stop="submit">提交</div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$emit('back')
    },
    submit() {
      let passwordOld = this.$refs.password1.value;
      let passwordNew = this.$refs.password2.value;
      let passwordNew2 = this.$refs.password3.value;
      if (passwordNew !== passwordNew2) {
        this.$toast("两次密码不一样", "error");
        return;
      }
      if (passwordNew.length < 5) {
        this.$toast("密码不能小于5位数", "error");
        return;
      }
      let data = {
        passwordOld: passwordOld,
        passwordNew: passwordNew
      };
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
</style>
