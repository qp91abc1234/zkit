<script setup lang="ts">
import ScrollView from '@/components/ScrollView/scrollView.vue'

const mousemove = () => {
  console.log('mousemove')
}

const touchmove = () => {
  console.log('touchmove')
}

const wheelscroll = () => {
  console.log('wheelscroll')
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
      @mousemove="mousemove"
      @touchmove="touchmove"
      @wheelscroll="wheelscroll"
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
