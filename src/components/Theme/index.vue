<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 16:54:34
 * @LastEditTime: 2023-08-26 13:49:23
 * @LastEditors: Amber
-->
<script setup>
// import { ref } from 'vue'
import { useAppStore } from '../../stores/app'

const app = useAppStore()

// 根据系统设置自动更换主题
const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
themeMedia.addListener(e => {
	if (e.matches) {
		console.log('light')
	} else {
		console.log('dark')
	}
})
</script>
<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__jackInTheBox"
      leave-active-class="animate__animated animate__hinge absolute"
    >
      <icon v-show="app.theme === 'light'" class="text-2xl" type="icon-sun" @click="app.switchThemes()" />
    </transition>
    <transition
      enter-active-class="animate__animated animate__jackInTheBox"
      leave-active-class="animate__animated animate__hinge absolute"
    >
      <icon v-show="app.theme !== 'light'" class="text-2xl" type="icon-Moon"  @click="app.switchThemes()" />
    </transition>
  </div>
</template>