<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-10 19:34:04
 * @LastEditors: Amber
-->
<script>
// import { h, ref } from 'vue'

export default {
	props: ['icon', 'title'],
}
</script>
<template>
  <i v-if="icon.includes('icon')"></i>
  <component v-else :is="icon" />
  <span>{{ title }}</span>
</template>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
