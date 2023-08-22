<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 21:23:25
 * @LastEditTime: 2023-08-22 17:00:25
 * @LastEditors: Amber
-->
<script setup>
import { ref } from 'vue'
import AppView from './components/app.vue'
const activeKey = ref(1)
</script>
<template>
  <div class="content-main">
    <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane :key="1" tab="系统配置">
      <app-view />
    </a-tab-pane>
    <a-tab-pane :key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane :key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
  </div>
</template>