<script setup lang="ts">
import VideoPlayer from '@/components/videoPlayer/videoPlayer.vue'
</script>

<template>
  <div class="video-player-wrap">
    <VideoPlayer
      class="video-player"
      :autoplay="false"
      poster="https://cdn-s3-gjzc.my.99.com/pre-creation-zone/image/62a1ccc539eb820020a5a673.png"
      path="https://cdn-s3-gjzc.my.99.com/pre-creation-zone/video/62a1ccd739eb820020a5a676.mp4"
      blur-bg="https://cdn-s3-gjzc.my.99.com/pre-creation-zone/image/62a1ccc539eb820020a5a673.png"
      :control-bar="{ fullscreenToggle: false }"
    >
      <div class="water-mask"></div>
    </VideoPlayer>
  </div>
</template>

<style scoped lang="scss">
.video-player-wrap {
  width: 100%;
  height: 100%;

  .video-player {
    width: 400px;
    height: 300px;

    .water-mask {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 100px;
      height: 50px;
      background: url('@/assets/mask.png');
      background-size: 100%;
    }
  }
}
</style>
