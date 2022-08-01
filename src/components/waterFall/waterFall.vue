<script setup lang="ts">
import { ResizeObserver as Polyfill } from '@juggle/resize-observer'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { debounce } from '@/utils/index'

const ResizeObserver = window.ResizeObserver || Polyfill
const container = ref()
const content = ref()

// 数据 id
let id = ''
// 每列高度
const colHeight: number[] = []
// 每列宽度，以第一个列表项宽度为准
let colWidth = 0
let colNum = 0
let marginL = 0
let contentH = 0
// 当前正在渲染的元素索引
let renderIndex = 0
// 瀑布流是否在渲染
let isRendering = false
// 是否需要重新渲染
let needReRender = false
// 是否需要连续渲染
let needContinueRender = false

const props = withDefaults(
  defineProps<{
    id: string
    data: any[]
    loadDis?: number
  }>(),
  {
    id: '',
    data: () => [],
    loadDis: 300
  }
)

const emit = defineEmits(['loadMore'])

watch(
  () => {
    return props.data
  },
  () => {
    if (id !== props.id) {
      id = props.id
      reRender()
    } else if (isRendering) {
      needContinueRender = true
    } else {
      render()
    }
  },
  {
    flush: 'post'
  }
)

onMounted(() => {
  resizeOb.observe(container.value)
  container.value.removeEventListener('scroll', onScroll)
  container.value.addEventListener('scroll', onScroll)
  id = props.id
})

onBeforeUnmount(() => {
  resizeOb.disconnect()
})

const onScroll = () => {
  loadMore()
}

const render = async () => {
  isRendering = true
  calcParams()
  await layout()
  isRendering = false
  afterRender()
}

const calcParams = () => {
  if (renderIndex !== 0) return

  if (content.value.children.length > 0) {
    colWidth = content.value.children[0].clientWidth
    colNum = Math.floor(container.value.clientWidth / colWidth)
    colNum = colNum < 2 ? 2 : colNum
    marginL = (container.value.clientWidth - colNum * colWidth) / 2
    marginL = marginL < 0 ? 0 : marginL
    colHeight.length = colNum
    for (let i = 0; i < colHeight.length; i++) {
      colHeight[i] = 0
    }
  }

  contentH = 0
  content.value.style.height = `${contentH}px`
}

const layout = async () => {
  const len = content.value.children.length
  const items = [...content.value.children]

  for (let i = renderIndex; i < len; i++) {
    const index = getMinHColumn()
    await loadImg(items[i])
    if (needReRender) {
      break
    }
    const newX = Math.floor(marginL + colWidth * index)
    const newY = Math.floor(colHeight[index])
    items[i].style.transform = `translate(${newX}px, ${newY}px)`
    colHeight[index] += items[i].clientHeight
    if (colHeight[index] > contentH) {
      contentH = colHeight[index]
      content.value.style.height = `${contentH}px`
    }
  }

  renderIndex = len
}

const getMinHColumn = () => {
  let minH = colHeight[0]
  let ret = 0

  for (let i = 1; i < colNum; i++) {
    if (colHeight[i] < minH) {
      minH = colHeight[i]
      ret = i
    }
  }

  return ret
}

const loadImg = (item) => {
  const imgs = item.getElementsByTagName('img')
  const arr: any[] = []
  for (let i = 0; i < imgs.length; i++) {
    const src = imgs[i].getAttribute('src')
    if (!src) continue

    const p = new Promise((resolve, reject) => {
      imgs[i].src = src

      if (imgs[i].complete) {
        resolve(null)
      } else {
        imgs[i].onload = () => {
          resolve(null)
        }
        imgs[i].onerror = () => {
          resolve(null)
        }
      }
    })

    arr.push(p)
  }

  return Promise.all(arr)
}

const afterRender = () => {
  if (needContinueRender) {
    needContinueRender = false
    render()
  } else if (needReRender) {
    needReRender = false
    renderIndex = 0
    render()
  } else {
    loadMore()
  }
}

const loadMore = () => {
  if (isRendering) {
    return
  }

  if (
    container.value.clientHeight + container.value.scrollTop + props.loadDis >=
    contentH
  ) {
    emit('loadMore')
  }
}

const reRender = () => {
  if (isRendering) {
    needReRender = true
  } else {
    renderIndex = 0
    render()
  }
}

const resizeOb = new ResizeObserver(debounce(reRender, 300, true))
</script>

<template>
  <div class="container" ref="container">
    <div class="content" ref="content">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    position: relative;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
.zkit-waterfall-item {
  will-change: transform;
  transform: translate(-100%, -100%);
  position: absolute !important;
  top: 0;
  left: 0;
}
</style>
