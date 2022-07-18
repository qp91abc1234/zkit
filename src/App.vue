<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayerDemo from '@/examples/videoPlayer/index.vue'

const index = ref('VideoPlayerDemo')
</script>

<template>
  <VideoPlayerDemo v-if="index === 'VideoPlayerDemo'"></VideoPlayerDemo>
</template>

<style scoped lang="scss"></style>
