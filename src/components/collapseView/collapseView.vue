<script setup lang="ts">
import { ref, onUpdated, onMounted, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    delta?: number
  }>(),
  {
    open: false,
    delta: 0.3
  }
)

const emits = defineEmits<{
  (event: 'update:open', val: boolean): void
  (event: 'click', val: boolean): void
}>()

const contentWrap = ref()
const contentH = ref('0px')

const getDelta = computed(() => {
  return `${props.delta}s`
})

onMounted(() => {
  contentH.value = contentWrap.value
    ? `${contentWrap.value.clientHeight}px`
    : '0px'
})

onUpdated(() => {
  contentH.value = contentWrap.value
    ? `${contentWrap.value.clientHeight}px`
    : '0px'
})

const click = () => {
  emits('update:open', !props.open)
  emits('click', !props.open)
}
</script>

<template>
  <div class="collapse" :class="{ isOpen: open }">
    <div @click="click">
      <slot></slot>
    </div>
    <div class="content">
      <div ref="contentWrap">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapse {
  position: relative;
  .content {
    overflow: hidden;
    max-height: 0;
    transition: max-height v-bind(getDelta) ease-in-out;
  }
  &.isOpen {
    .content {
      max-height: v-bind(contentH);
    }
  }
}
</style>
