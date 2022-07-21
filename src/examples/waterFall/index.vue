<script setup lang="ts">
import { ref } from 'vue'
import WaterFall from '@/components/waterFall/waterFall.vue'
</script>

<template>
  <div class="waterFall-wrap">
    <WaterFall> </WaterFall>
  </div>
</template>

<style scoped lang="scss">
.waterFall-wrap {
  width: 100%;
  height: 100%;
}
</style>
