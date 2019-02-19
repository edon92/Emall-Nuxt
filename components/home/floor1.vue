<template>
  <div class="container">
    <div class="title">
      <div class="f-type" ref="type">{{floorName}}</div>
    </div>
    <div class="floor-goods">
      <div class="floor-left floor">
        <div class="good main-good" @click="ToDetail(floorData[0].goodsId)">
          <img :src="floorData[0].image" style="width:100%;height:100%">
        </div>
      </div>
      <div class="floor-right floor">
        <div class="good two" @click="ToDetail(floorData[1].goodsId)">
          <img :src="floorData[1].image" alt style="width:100%;height:100%">
        </div>
        <div class="good" @click="ToDetail(floorData[2].goodsId)">
          <img :src="floorData[2].image" alt class="three" style="width:100%;height:100%">
        </div>
      </div>
    </div>
    <div class="good-list">
      <div class="good" @click="ToDetail(floorData[3].goodsId)">
        <img :src="floorData[3].image" alt class="list-item four" style="width:100%;height:100%">
      </div>
      <div class="good" @click="ToDetail(floorData[4].goodsId)">
        <img :src="floorData[4].image" alt class="list-item five" style="width:100%;height:100%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    floorData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    floorName: String,
    floorNumber: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {
    const typeColor = {
      1: '#f36022',
      2: '#45bb26',
      3: '#1e80ef'
    }
    this.$refs.type.style = `color:${typeColor[this.floorNumber]}`
  },
  methods: {
    ToDetail(goodsId) {
      this.$router.push(`/detail?goodsId=${goodsId}`);
    },
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
.container
  display: flex
  flex-direction: column
  .title
    display: flex
    flex-direction: row
    height: 2rem
    justify-content: center
    align-items: center
    .f-logo
      text-align: center
      width: 1.25rem
      height: 1.25rem
      line-height: 1.25rem
      border-radius: 50%
      background: #c60023
      color: #fff
    .f-type
      margin-left: 1.25rem
      color: $color-theme
      font-size: 16px
  .floor-goods
    display: flex
    justify-content: space-between
    box-sizing: border-box
    bottom-1px(#eee)
    .main-good
      right-1px(#eee)
    .good
      height: 100%
    .floor
      height: 11.25rem
    .floor-right
      display: flex
      flex-direction: column
      .good
        box-sizing: border-box
        height: 50%
      .two
        bottom-1px(#eee)
  .good-list
    display: flex
    justify-content: space-between
    box-sizing: border-box
    height: 6rem
    div:nth-child(odd)
      right-1px(#eee)
</style>