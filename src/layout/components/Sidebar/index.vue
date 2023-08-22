<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:04:26
 * @LastEditTime: 2023-08-22 16:20:36
 * @LastEditors: Amber
-->
<script setup>
import { computed} from 'vue'
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
const onChangeMenu = (val) => {
	app.sidebarOpenKeys = val.keyPath
	app.sidebarSelectKeys = val.selectedKeys
}
</script>
<template>
  <div :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <a-menu
      :selectedKeys="app.sidebarSelectKeys"
      v-model:openKeys="app.sidebarOpenKeys"
      theme="dark"
      mode="inline"
			@select="onChangeMenu"
		>
      <!-- 菜单遍历的开始 -->
      <sidebar-item v-for="route in permission.addRoutes" :key="route.path" :item="route" />
    </a-menu>
  </div>
</template>