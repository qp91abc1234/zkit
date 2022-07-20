<script setup lang="ts">
import { ref } from 'vue'
import Subsection from '@/components/subsection/subsection.vue'

const content = ref([1, 2, 3, 4])
const cur = ref(0)
const handleClickSubsection = async (val) => {
  console.log(val)
}
</script>

<template>
  <div class="subsection-wrap">
    <Subsection
      :num="content.length"
      v-model:cur="cur"
      @click="handleClickSubsection"
    >
      <template #default="{ index }">
        <div class="content" :class="{ 'is-sel': cur === index }">
          {{ index }}
        </div>
      </template>
    </Subsection>
  </div>
</template>

<style scoped lang="scss">
.subsection-wrap {
  width: 100%;
  height: 100%;
  .content {
    width: 150px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    &.is-sel {
      background-color: red;
    }
  }
}
</style>
