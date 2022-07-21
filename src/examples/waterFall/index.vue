<script setup lang="ts">
import { ref } from 'vue'
import WaterFall from '@/components/waterFall/waterFall.vue'
import '@/components/waterFall/waterFall.css'

const imgUrls = ref<string[]>([
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.1ChedSsZH_Uw30w2BhWAmQHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  'https://tse3-mm.cn.bing.net/th/id/OIP-C.efgack6xMwiSIBk7RTd67QHaK0?w=123&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.200mFay1uHJpgtmIyYQopgHaEo?w=289&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.JqZfF76AsZ1RUdyUM8pqsAHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  'https://tse3-mm.cn.bing.net/th/id/OIP-C.0gr7sgfy7WN9o-BtvtkdzQHaWV?w=100&h=302&c=7&r=0&o=5&dpr=1.1&pid=1.7',
  'https://tse4-mm.cn.bing.net/th/id/OIP-C.05ItWcZCP9aUaBHYgGvtMAHaKy?w=100&h=145&c=7&r=0&o=5&dpr=1.1&pid=1.7'
])
</script>

<template>
  <div class="waterFall-wrap">
    <WaterFall class="waterfall" :id="0">
      <div v-for="item in imgUrls" :key="item" class="zkit-waterfall-item">
        <img class="img" :src="item" />
      </div>
    </WaterFall>
  </div>
</template>

<style scoped lang="scss">
.waterFall-wrap {
  width: 100%;
  height: 100%;
  .waterfall {
    width: 500px;
    height: 300px;
    background-color: aqua;
    .zkit-waterfall-item {
      width: 229px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
