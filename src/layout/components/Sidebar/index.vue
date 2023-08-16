<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:04:26
 * @LastEditTime: 2023-08-15 01:00:08
 * @LastEditors: Amber
-->
<script setup>
import { computed} from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
// import variables from '@/styles/_variables.module.scss'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const app = useAppStore()
const permission = usePermissionStore()

const showLogo = computed(() => {
	return app.sidebarLogo
})
const isCollapse = computed(() => {
	return !app.sidebar.opened
})
const activeMenu = computed(() => {
	const { meta, path } = useRoute()
	if (meta.activeMenu) {
		return meta.activeMenu
	}
	return path
})
const openKeys = computed(() => {
	const { path } = useRoute()
	let arr = []
	arr = path.split('/').splice(1,path.split('/').length)
	arr = arr.map(item=>{
		item = '/' + item
		return item
	})
	return arr
})
</script>
<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <a-menu
      :selectedKeys="[activeMenu]"
      :openKeys="openKeys"
      theme="dark"
      mode="inline">
      <!-- 菜单遍历的开始 -->
      <sidebar-item v-for="route in permission.routes" :key="route.path" :item="route" :base-path="route.path" />
    </a-menu>
  </div>
</template>