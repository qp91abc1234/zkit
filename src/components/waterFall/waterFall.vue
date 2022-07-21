<script setup lang="ts">
import { ResizeObserver as Polyfill } from '@juggle/resize-observer'
import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
  computed
} from 'vue'
import { debounce } from '@/utils'

const ResizeObserver = window.ResizeObserver || Polyfill
const container = ref()
const content = ref()

// 每列高度
const colHeight: number[] = []
let colNum = 0
let marginL = 0
let contentH = 0
// 当前正在渲染的元素索引
let renderIndex = 0
let renderDistance = 0
// 瀑布流是否渲染完毕
let isRenderFinish = true
let isDelayRender = false
let isUnmount = false

const props = withDefaults(
  defineProps<{
    id: string
    width: number
    data: any[]
    dataKey: string
  }>(),
  {
    id: '',
    width: 300,
    data: () => [],
    dataKey: ''
  }
)

const emit = defineEmits(['loadMore'])

const getWidth = computed(() => {
  return props.width
})

watch(
  () => {
    return props.id
  },
  () => {
    if (isRenderFinish) {
      renderIndex = 0
    } else {
      isDelayRender = true
    }
  }
)

onMounted(() => {
  resizeOb.observe(container.value)
  container.value.removeEventListener('scroll', onScroll)
  container.value.addEventListener('scroll', onScroll)
  container.value.style['min-width'] = getWidth.value * 2

  calcParams()
  render()
})

onBeforeUnmount(() => {
  isUnmount = true
  resizeOb.disconnect()
})

onUpdated(() => {
  render()
})

const onResize: any = debounce(() => {
  calcParams()

  if (isRenderFinish) {
    renderIndex = 0
    render()
  } else {
    isDelayRender = true
  }
}, 500)

const onScroll = () => {
  loadMore()
}

const calcParams = () => {
  if (isUnmount) {
    return
  }

  colNum = Math.floor(container.value.clientWidth / getWidth.value)
  marginL = (container.value.clientWidth - colNum * getWidth.value) / 2
  renderDistance = container.value.clientHeight
}

const render = async () => {
  if (isUnmount) {
    return
  }

  if (props.data.length === 0) {
    content.value.style.height = '0px'
    return
  }

  if (!isRenderFinish) {
    return
  }

  isRenderFinish = false

  const len = content.value.children.length
  const items = [...content.value.children]

  if (renderIndex === 0) {
    contentH = 0
    colHeight.length = colNum
    for (let i = 0; i < colHeight.length; i++) {
      colHeight[i] = 0
    }
  }

  for (let i = renderIndex; i < len; i++) {
    const index = getMinHColumn()
    await loadImg(items[i])
    const newX = Math.floor(marginL + getWidth.value * index)
    const newY = Math.floor(colHeight[index])
    items[i].style.transform = `translate(${newX}px, ${newY}px)`
    colHeight[index] += items[i].clientHeight
    if (colHeight[index] > contentH) {
      contentH = colHeight[index]
      content.value.style.height = `${contentH}px`
    }
  }

  isRenderFinish = true
  if (isDelayRender) {
    isDelayRender = false
    renderIndex = 0
    render()
  } else {
    renderIndex = len
    loadMore()
  }
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

const loadMore = () => {
  if (isUnmount) {
    return
  }

  if (!isRenderFinish) {
    return
  }

  if (
    contentH - container.value.scrollTop <=
    container.value.clientHeight + renderDistance
  ) {
    emit('loadMore')
  }
}

const resizeOb = new ResizeObserver(onResize)
</script>

<template>
  <div class="container" ref="container">
    <div class="content" ref="content">
      <div v-for="item in data" :key="item[dataKey]" class="item">
        <slot :scope="item"></slot>
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  .content {
    position: relative;
    .item {
      will-change: transform;
      transform: translate(-100%, -100%);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
