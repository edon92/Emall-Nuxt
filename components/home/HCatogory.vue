<template>
  <div class="container">
    <div class="catogory-item" v-for="(item, index) in Hcatogory" :key="index">
      <img class="item-img" v-lazy="item.image" @click="selectType(index)">
      <div class="item-name">{{item.mallCategoryName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    Hcatogory: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      typeList: ['新鲜水果','精选干货','营养奶品','食品饮料','个人护理']
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    selectType(index) {
      this.$router.push(`/category?type=${this.typeList[index]}`)
    }
  }
}

</script>
<style lang="stylus" scoped>
.container
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 .25rem
  background: #fff
  width: 100%
  height: 5.5rem
  border-radius: .3125rem
  .catogory-item
    display: flex
    align-items: center
    flex-direction: column
    .item-img
      display: block
      width: 2.4rem
      height: 2.4rem
    .item-name
      margin-top: .6rem
      font-size: 14px
      // color: #666
</style>