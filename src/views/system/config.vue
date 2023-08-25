<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 21:23:25
 * @LastEditTime: 2023-08-25 01:23:56
 * @LastEditors: Amber
-->
<script setup>
import { ref } from 'vue'
import ConfigApp from './components/ConfigApp.vue'
const activeKey = ref(1)
</script>
<template>
  <div class="content-main">
    <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane :key="1" tab="系统配置">
      <config-app />
    </a-tab-pane>
    <a-tab-pane :key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane :key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
  </div>
</template>