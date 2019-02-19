<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="地址列表" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="detail" v-if="this.addressList.length">
      <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit"/>
    </div>
    <div class="detail" v-else>
      <div class="desc">暂无地址，请点下方按钮添加</div>
      <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  layout: "login",
  props: {
    addressList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
    onEdit(item, index) {
      this.$emit("onEdit", item);
    },
    onClickLeft() {
      this.$emit("back");
      // this.$router.back()
    }
  }
};
</script>
<style lang="stylus" scoped>
.container >>> .van-button--danger
  background: #ff976a
  border: 1px solid #ff976a
.container
  min-height: 100%
  background: #fff
  .desc
    height: 200px
    padding: 20px 20px
    font-size: 18px
    font-weight: 200
</style>