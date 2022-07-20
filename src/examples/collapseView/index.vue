<script setup lang="ts">
import { ref } from 'vue'
import CollapseView from '@/components/collapseView/collapseView.vue'

const open = ref(false)

const click = (val) => {
  console.log(val)
}
</script>

<template>
  <div class="collapse-wrap">
    <CollapseView class="collapse-view" v-model:open="open" @click="click">
      <div class="btn">折叠按钮</div>
      <template #content>
        <div class="content"></div>
      </template>
    </CollapseView>
    <div class="other"></div>
  </div>
</template>

<style scoped lang="scss">
.collapse-wrap {
  width: 100%;
  height: 100%;
  .collapse-view {
    width: 200px;
    .btn {
      width: 100%;
      height: 100px;
      text-align: center;
      background-color: aqua;
      line-height: 100px;
    }
    .content {
      width: 100%;
      height: 200px;
      background: linear-gradient(red, blue);
    }
  }
  .other {
    width: 200px;
    height: 100px;
    background-color: antiquewhite;
  }
}
</style>
