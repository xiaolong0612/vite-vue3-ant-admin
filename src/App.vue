<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 12:45:08
 * @LastEditTime: 2023-08-27 12:11:58
 * @LastEditors: Amber
-->
<script setup>
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { messages } from '@/locales'
const app = useAppStore()
const locale = computed(() => {
	return messages[app.config.lang]
})
const { darkAlgorithm, compactAlgorithm } = theme
const useTheme = computed(() => {
	if(app.theme == 'dark'){
		return {
			algorithm: [darkAlgorithm, compactAlgorithm],
		}
	} else return {}
})
</script>
<template>
  <a-config-provider :locale="locale" :theme="useTheme">
    <RouterView />
</a-config-provider>
</template>
