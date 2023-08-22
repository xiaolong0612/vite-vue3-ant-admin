<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:04:26
 * @LastEditTime: 2023-08-22 14:30:09
 * @LastEditors: Amber
-->
<script setup>
import { ref, defineProps } from 'vue'
import AppLink from './Link.vue'
import Item from './Item.vue'
import SidebarItem from './SidebarItem.vue'

const  props = defineProps({
	isNest: {
		type:Boolean,
		default: false
	},
	item: {
		type: Object,
		default: () => {}
	}
})

let onlyOneChild = ref(props.item)
const hasOneShowingChild = (children = [], parent) => {
	const showingChildren = children.filter(item => {
		if (!item.meta.title) {
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
		(onlyOneChild.value) = { ... parent, noShowingChildren: true }
		return true
	}
	return false
}
</script>
<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item?.children, item) && (!onlyOneChild?.children||(onlyOneChild).noShowingChildren)">
      <a-menu-item :key="item._id">
        <app-link :to="onlyOneChild.path">
          <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </app-link>
      </a-menu-item>
    </template>
    <a-sub-menu v-else :key="item._id">
      <template #title v-if="item.meta">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child._id"
          :item="child"
        />
    </a-sub-menu>
  </template>
</template>

