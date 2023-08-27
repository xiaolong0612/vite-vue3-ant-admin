<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-12 16:22:15
 * @LastEditTime: 2023-08-27 11:01:01
 * @LastEditors: Amber
-->
<template>
  <github-corner class="absolute top-100 right-0 z-10" v-if="useAppStore().github" />
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
    >
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup>
import GithubCorner from '@/components/GithubCorner/index.vue'
import { useTagsViewStore } from '@/stores/tagsView'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'
const cachedViews = computed(() => {
	return useTagsViewStore().cachedViews
})
</script>
