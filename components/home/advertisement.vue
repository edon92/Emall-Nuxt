<template>
  <div class="container">
    <img :src="advertesPicture.PICTURE_ADDRESS" alt="" class="ad">
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    advertesPicture: Object
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="stylus" scoped>
.container
  width: 100%
  .ad
    width: 100%
</style>