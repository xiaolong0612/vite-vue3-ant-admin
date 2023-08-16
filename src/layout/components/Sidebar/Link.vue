<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  to: String
})

const isExternalVal = computed(() => {
  return isExternal(props.to)
})

const type = computed(() => {
  if (isExternalVal.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to) => {
  if (isExternalVal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
