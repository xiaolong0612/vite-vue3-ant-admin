<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-27 10:56:41
 * @LastEditors: Amber
-->
<script setup>
import { ref, defineProps } from 'vue'
import settings from '@/settings'
import { usePermissionStore } from '@/stores/permission'

const permission = usePermissionStore()

const title = settings.title
const logo = ref('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')
defineProps({
	collapse: Boolean
})
</script>
<template>
  <transition
    enter-active-class="animate__animated animate__bounceInRight"
  >
    <div class="sidebar-logo-container" :class="{'is-collapse': collapse}" v-if="collapse">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" :to="permission.addRoutes[0].path">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
    </div>
    <div class="sidebar-logo-container" :class="{'is-collapse': collapse}" v-else>
      <router-link key="expand" class="sidebar-logo-link" :to="permission.addRoutes[0].path">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </div>
  </transition>
</template>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }

  &.is-collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>