<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayerDemo from '@/examples/videoPlayer/index.vue'
import ScrollViewDemo from '@/examples/scrollView/index.vue'
import CollapseViewDemo from '@/examples/collapseView/index.vue'
import SubsectionDemo from '@/examples/subsection/index.vue'
import WaterFallDemo from '@/examples/waterFall/index.vue'

const index = ref('waterFallDemo')
</script>

<template>
  <VideoPlayerDemo v-if="index === 'VideoPlayerDemo'"></VideoPlayerDemo>
  <ScrollViewDemo v-if="index === 'scrollViewDemo'"></ScrollViewDemo>
  <CollapseViewDemo v-if="index === 'collapseViewDemo'"></CollapseViewDemo>
  <SubsectionDemo v-if="index === 'subsectionDemo'"></SubsectionDemo>
  <WaterFallDemo v-if="index === 'waterFallDemo'"></WaterFallDemo>
</template>

<style scoped lang="scss"></style>
