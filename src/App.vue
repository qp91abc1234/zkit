<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayerDemo from '@/examples/videoPlayer/index.vue'
import ScrollViewDemo from '@/examples/scrollView/index.vue'
import CollapseViewDemo from '@/examples/collapseView/index.vue'

const index = ref('collapseViewDemo')
</script>

<template>
  <VideoPlayerDemo v-if="index === 'VideoPlayerDemo'"></VideoPlayerDemo>
  <ScrollViewDemo v-if="index === 'scrollViewDemo'"></ScrollViewDemo>
  <CollapseViewDemo v-if="index === 'collapseViewDemo'"></CollapseViewDemo>
</template>

<style scoped lang="scss"></style>
