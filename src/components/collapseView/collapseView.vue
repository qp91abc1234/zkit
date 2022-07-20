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

const childWrap = ref()
const childH = ref('0px')

const getDelta = computed(() => {
  return `${props.delta}s`
})

onMounted(() => {
  childH.value = childWrap.value ? `${childWrap.value.clientHeight}px` : '0px'
})

onUpdated(() => {
  childH.value = childWrap.value ? `${childWrap.value.clientHeight}px` : '0px'
})

const click = () => {
  emits('update:open', !props.open)
  emits('click', !props.open)
}
</script>

<template>
  <div class="collapse" :class="{ isOpen: open }">
    <div class="main" @click="click">
      <slot></slot>
    </div>
    <div class="child">
      <div ref="childWrap">
        <slot name="childs"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapse {
  position: relative;
  .child {
    overflow: hidden;
    max-height: 0;
    transition: max-height v-bind(getDelta) ease-in-out;
  }
  &.isOpen {
    .child {
      max-height: v-bind(childH);
    }
  }
}
</style>
