<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 02:39:38
 * @LastEditTime: 2023-08-16 13:45:01
 * @LastEditors: Amber
-->
<script setup>
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>
<template>
  <div class="content-main">
    <div class="dashboard-text">name: {{ user.username }}</div>
    <icon type="酷" className="text-7xl"/>
    <icon type="icon-baomihua-01" className="text-7xl"/>
    <icon type="star-outlined" className="text-7xl text-yellow-400"/>
  </div>
</template>