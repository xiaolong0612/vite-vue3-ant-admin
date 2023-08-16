<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 02:55:31
 * @LastEditTime: 2023-08-14 16:15:46
 * @LastEditors: Amber
-->
<template>
  <div @click="toggleClick" class="p-0.5 text-lg">
    <div class="px-4">
      <MenuUnfoldOutlined v-if="!isActive" />
      <MenuFoldOutlined v-else />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const emit = defineEmits(['toggleClick'])

defineProps({
	isActive: Boolean
})

const toggleClick = () => {
	emit('toggleClick')
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
