<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="detail">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :address-info="addressInfo"
        :is-saving="isSaving"
        :is-deleting="isDeleting"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
    <div class="loading" v-show="showLoading">
      <van-loading type="spinner" color="#f8762c"/>
    </div>
  </div>
</template>

<script>
import areaList from "@/common/js/area";
import OrderService from "@/service/order";
export default {
  components: {},
  layout: "login",
  transition: "address",
  props: {
    addressInfo: {
      type: Object,
      default: {}
    },
    isEditingPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areaList,
      isSaving: false,
      isDeleting: false,
      list: [],
      showLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // console.log('111',this.addressInfo)
  },
  methods: {
    onSave(address) {
      this.showLoading = true
      // 如果是点编辑的话，则去数据库修改
      if (this.isEditingPage) {
        //请求后台修改
        console.log("后台修改", address);
        this.updataAddress(address);
      } else {
        //如果是点添加地址
        console.log("添加新地址", address);
        this.submitNewAddress(address);
      }
    },
    onDelete(address) {
      console.log("onDelete",address);
      let data = {
        userId: address.userId,
        id: address.id
      }
      OrderService._deledtAddress(data).then(res => {
        if(res.status === 200) {
          if(res.data.code === 0) {
            this.$toast('删除成功')
            // window.location.reload()
          }
        } else {
          this.$toast('请稍后再试')
        }
      })
    },
    onChangeDetail() {
      console.log("onChangeDetail");
    },
    onClickLeft() {
      this.$emit("back");
      // this.$router.back()
    },
    updataAddress(address) {
      OrderService._updateAddress(address).then(res => {
        if (res.status == 200) {
          if (res.data.code === 0) {
            this.$toast("修改成功");
          } else {
            this.$toast("修改失败，请稍后再试");
          }
        }
        this.showLoading = false
        this.$emit("hasChangeAdd");
      });
    },
    submitNewAddress(address) {
      OrderService._createAddress(address).then(res => {
        if (res.status == 200) {
          if (res.data.code === 0) {
            this.$toast("添加成功");
          } else {
            this.$toast("添加失败，请稍后再试");
          }
        }
        this.showLoading = false        
        this.$emit("hasChangeAdd");
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.container >>> .van-button--danger
  background: #ff976a
  border: 1px solid #ff976a
.container
  // min-height: 100%
  background: #fff
  .loading
    position: fixed
    top: 50%
    left: 50%
    margin-top: -0.5rem
    margin-left: -0.5rem
</style>