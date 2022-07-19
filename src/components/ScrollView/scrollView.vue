<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import smoothscroll from 'smoothscroll-polyfill'
import 'default-passive-events'

const container = ref()
const content = ref()

const props = withDefaults(
  defineProps<{
    vertical?: boolean
    mouse?: boolean
    loadRatio?: number // 达到内容尺寸的多少比例触发加载更多
  }>(),
  {
    vertical: true,
    mouse: false,
    loadRatio: 1
  }
)

const emit = defineEmits<{
  (event: 'loadmore'): void
  (event: 'wheelscroll', val: any): void
  (event: 'mousemove', val: any): void
  (event: 'touchmove', val: any): void
}>()

defineExpose({
  scrollToPos
})

onMounted(() => {
  container.value.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  container.value.removeEventListener('scroll', onScroll)
})

function scrollToPos(pos: number, behavior: 'auto' | 'smooth' = 'auto') {
  container.value.scrollTo({
    left: props.vertical ? 0 : pos,
    top: props.vertical ? pos : 0,
    behavior
  })
}

function onScroll() {
  if (
    props.vertical &&
    container.value.clientHeight + container.value.scrollTop >=
      content.value.clientHeight * props.loadRatio
  ) {
    emit('loadmore')
  }

  if (
    !props.vertical &&
    container.value.clientWidth + container.value.scrollLeft >=
      content.value.clientWidth * props.loadRatio
  ) {
    emit('loadmore')
  }
}

function wheelScroll(e) {
  emit('wheelscroll', e)
}

function mousedown(e) {
  if (!props.mouse) return
  const start: number = props.vertical
    ? container.value?.scrollTop
    : container.value?.scrollLeft

  document.onmousemove = (ev) => {
    const dis = Math.sqrt(
      (e.y - ev.y) * (e.y - ev.y) + (e.x - ev.x) * (e.x - ev.x)
    )
    if (dis <= 2) {
      return
    }

    if (props.vertical) {
      container.value.scrollTop = start + (e.y - ev.y)
    } else {
      container.value.scrollLeft = start + (e.x - ev.x)
    }

    // 元素永远不会成为鼠标事件的 target
    content.value.style.pointerEvents = 'none'
    emit('mousemove', ev)
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    content.value.style.pointerEvents = 'auto'
  }
}

function touchmove(e) {
  emit('touchmove', e)
}

smoothscroll.polyfill()
</script>

<template>
  <div
    ref="container"
    class="scroll-view"
    :class="{ horizontal: !vertical }"
    @mousewheel="wheelScroll"
    @mousedown="mousedown"
    @touchmove="touchmove"
  >
    <div ref="content" class="content">
      <slot></slot>
    </div>
    <slot name="bottom"> </slot>
  </div>
</template>

<style scoped lang="scss">
.scroll-view {
  overflow: hidden scroll;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    width: 100%;
  }
  &.horizontal {
    overflow: scroll hidden;
    .content {
      width: auto;
      height: 100%;
    }
  }
}
</style>
