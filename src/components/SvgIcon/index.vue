<template>
  <div v-if="isExternal(icon)" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="[className, 'svg-icon']" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'
const props = defineProps({
	icon: {
		type: String,
		required: true
	},
	className: {
		type: String,
		default: ''
	}
})
const styleExternalIcon = computed(() => {
	return {
		mask: `url(${props.iconClass}) no-repeat 50% 50%`,
		'-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
	}
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
