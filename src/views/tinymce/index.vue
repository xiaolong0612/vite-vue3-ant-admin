<!--
 * @Description: Tinymce
 * @Author: Amber
 * @Date: 2023-08-20 16:51:01
 * @LastEditTime: 2023-08-20 16:53:39
 * @LastEditors: Amber
-->
<script setup>
import Tinymce from '@/components/Tinymce/index.vue'
import { ref } from 'vue'
const content = ref('')
const onChagneThiymce = (val) => {
	console.log(val)
}
</script>
<template>
  <div class="content-main">
    <tinymce v-model="content" @change="onChagneThiymce" width="100%" :min-height="192" />
  </div>
</template>