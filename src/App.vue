<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 12:45:08
 * @LastEditTime: 2023-08-27 09:32:35
 * @LastEditors: Amber
-->
<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()
const locale = zhCN
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
