<script setup lang="ts">
import ScrollView from '@/components/scrollView/scrollView.vue'

const ope = (type, ev) => {
  console.log(type, ev)
}

const loadmore = () => {
  console.log('loadmore')
}

const click = () => {
  console.log('click')
}
</script>

<template>
  <div class="scroll-view-wrap">
    <ScrollView
      class="scroll-view"
      :mouse="true"
      @ope="ope"
      @loadmore="loadmore"
    >
      <div class="content" @click="click"></div>
    </ScrollView>
  </div>
</template>

<style scoped lang="scss">
.scroll-view-wrap {
  width: 100%;
  height: 100%;
  .scroll-view {
    width: 400px;
    height: 300px;
    .content {
      width: 100%;
      height: 600px;
      background: linear-gradient(red, green);
    }
  }
}
</style>
