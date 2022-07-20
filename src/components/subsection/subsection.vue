<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    num: number
    cur: number
  }>(),
  {
    num: 0,
    cur: 0
  }
)

const emits = defineEmits<{
  (event: 'update:cur', val: number): void
  (event: 'click', val: number): void
}>()

const handleClickSubsection = (index) => {
  if (props.cur === index) {
    return
  }

  emits('update:cur', index)
  emits('click', index)
}
</script>

<template>
  <div class="subsection">
    <div
      v-for="index in num"
      :key="index"
      class="content-wrap"
      @click="handleClickSubsection(index - 1)"
    >
      <slot :index="index - 1"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subsection {
  display: flex;
  flex-direction: row;
  align-items: center;
  .content-wrap {
    height: 100%;
    flex-shrink: 0;
  }
}
</style>
