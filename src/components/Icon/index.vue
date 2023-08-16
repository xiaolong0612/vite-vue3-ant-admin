<!--
 * @Description: 将ant-icon、iconfont、svg封装到一个组件
 * @Author: Amber
 * @Date: 2023-08-12 03:29:24
 * @LastEditTime: 2023-08-15 18:56:58
 * @LastEditors: Amber
-->
<script setup>
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/c/font_4212007_exw7elikv1w.js', // 在 iconfont.cn 上生成
})
const props = defineProps({
	type: {
		type: String,
		default: 'smile-outlined'
	},
	className: {
		type: String,
		default: 'smile-outlined'
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