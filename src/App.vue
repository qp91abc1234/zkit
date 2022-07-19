<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayerDemo from '@/examples/videoPlayer/index.vue'
import scrollViewDemo from '@/examples/scrollView/index.vue'

const index = ref('scrollViewDemo')
</script>

<template>
  <VideoPlayerDemo v-if="index === 'VideoPlayerDemo'"></VideoPlayerDemo>
  <scrollViewDemo v-if="index === 'scrollViewDemo'"></scrollViewDemo>
</template>

<style scoped lang="scss"></style>
