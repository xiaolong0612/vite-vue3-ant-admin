<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:04:26
 * @LastEditTime: 2023-08-13 18:22:04
 * @LastEditors: Amber
-->
<script setup>
import path from 'path-browserify'
import { ref, defineProps } from 'vue'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import Item from './Item.vue'
import SidebarItem from './SidebarItem.vue'

const  props = defineProps({
	isNest: {
		type:Boolean,
		default: false
	},
	basePath: {
		type: String,
		default: ''
	},
	item: {
		type: Object,
		default: () => {}
	}
})

let onlyOneChild = ref(props.item)
const hasOneShowingChild = (children = [], parent) => {
	const showingChildren = children.filter(item => {
		if (!item.meta) {
			return false
		} else {
			// Temp set(will be used if only has one showing child)
			onlyOneChild.value = item
			return true
		}
	})
	// When there is only one child router, the child router is displayed by default
	if (showingChildren.length === 1) {
		return true
	}
	// Show parent if there are no child router to display
	if (showingChildren.length === 0) {
		(onlyOneChild.value) = { ... parent, path: '', noShowingChildren: true }
		return true
	}
	return false
}
const resolvePath = (routePath) => {
	if (isExternal(routePath)) {
		return routePath
	}
	if (isExternal(props.basePath)) {
		return props.basePath
	}
	return path.resolve(props.basePath, routePath)
}
</script>
<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item?.children, item) && (!onlyOneChild?.children||(onlyOneChild).noShowingChildren)">
      <a-menu-item :key="resolvePath(onlyOneChild.path)">
        <app-link v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild.path)">
          <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </app-link>
        </a-menu-item>
    </template>
    <a-sub-menu v-else :key="item.path">
      <template #title v-if="item.meta">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
    </a-sub-menu>
  </template>
</template>

