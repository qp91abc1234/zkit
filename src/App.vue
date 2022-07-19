<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayerDemo from '@/examples/videoPlayer/index.vue'
import ScrollViewDemo from '@/examples/scrollView/index.vue'

const index = ref('scrollViewDemo')
</script>

<template>
  <VideoPlayerDemo v-if="index === 'VideoPlayerDemo'"></VideoPlayerDemo>
  <ScrollViewDemo v-if="index === 'scrollViewDemo'"></ScrollViewDemo>
</template>

<style scoped lang="scss"></style>
