<script setup lang="ts">
import { ref } from 'vue'
import WaterFall from '@/components/waterFall/waterFall.vue'
import '@/components/waterFall/waterFall.css'

const id = ref(0)
const imgUrls = ref<string[]>([])

const delayGetData = () => {
  if (id.value === 0) {
    imgUrls.value = [
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.1ChedSsZH_Uw30w2BhWAmQHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.efgack6xMwiSIBk7RTd67QHaK0?w=123&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.200mFay1uHJpgtmIyYQopgHaEo?w=289&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.JqZfF76AsZ1RUdyUM8pqsAHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.0gr7sgfy7WN9o-BtvtkdzQHaWV?w=100&h=302&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.05ItWcZCP9aUaBHYgGvtMAHaKy?w=100&h=145&c=7&r=0&o=5&dpr=1.1&pid=1.7'
    ]
  }

  if (id.value === 1) {
    imgUrls.value = [
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.1ChedSsZH_Uw30w2BhWAmQHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.k91WUaWr4I3E4nPqySYP_wHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.WrgqpZ1ADs63h2tgNOw8VwHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.o7ASEMh89jZ0u-d4DpBlKwHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.KgQVAi3ZYpcZCp6BqJRYfgHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.-r5ET-m7YbXVgDZJW0GyowHaHa?w=208&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.j0JU7rO1muIQDCDyW5CmCAHaHa?w=208&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.oAofaiHIlMiepMHxvXxwyAHaHa?w=208&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.VP0E8Yo33976Q5TUwCptyQAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.uAdsscvOwkpZm1tZfSHj8QHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.6XwoKBeySTtLWa8BNtmfVQHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.OCG7ZAya4JfghMN0A_esnAHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.1&pid=1.7'
    ]
  }

  id.value++
}
</script>

<template>
  <div class="waterFall-wrap" @click="delayGetData">
    <WaterFall class="waterfall" :id="id">
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
