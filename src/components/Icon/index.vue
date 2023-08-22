<!--
 * @Description: 将ant-icon、iconfont、svg封装到一个组件
 * @Author: Amber
 * @Date: 2023-08-12 03:29:24
 * @LastEditTime: 2023-08-22 01:41:56
 * @LastEditors: Amber
-->
<script setup>
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import defaultSettings from '@/settings'

const IconFont = createFromIconfontCN({
	scriptUrl: defaultSettings.iconfont
})
const props = defineProps({
	type: {
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: ''
	}
})
const typeIsAnt = computed(() => {
	// two-tone 两个单词使用split('-')不准确, 特别处理
	const typeArr = props.type.split('-')
	return ['outlined', 'filled'].includes(typeArr[typeArr.length - 1]) || props.type.includes('two-tone')
})
</script>
<template>
  <!-- iconfont -->
  <icon-font v-if="type.includes('icon')" :type="type" :class="className" />
  <!-- ant icon -->
  <component v-else-if="typeIsAnt" :is="type" :class="className" />
  <!-- svg -->
  <svg-icon v-else :icon="type" :class="className"/>
</template>