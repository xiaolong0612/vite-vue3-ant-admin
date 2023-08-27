<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-25 22:45:23
 * @LastEditors: Amber
-->
<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import AppMain from './components/AppMain.vue'
import sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView/index.vue'
// import Settings from "./components/Settings/index.vue"
// import RightPanel from '@/components/RightPanel/index.vue'

const app = useAppStore()
let classObj = computed(() => {
	return {
		hideSidebar: !app.sidebar.opened,
		openSidebar: app.sidebar.opened,
		withoutAnimation: app.sidebar.withoutAnimation,
		mobile: app.device === 'Mobile'
	}
})

const { body } = document
const WIDTH = 992

onMounted(() => {
	if (_isMobile()) {
		app.toggleDevice('Mobile')
		app.closeSideBar(true)
	}
})

onBeforeMount(() => {
	window.addEventListener('resize', () => {
		_resizeHandler()
	})
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', () => {
		_resizeHandler()
	})
})
const _isMobile = () => {
	const rect = body.getBoundingClientRect()
	return rect.width - 1 < WIDTH
}
const _resizeHandler = () => {
	if (!document.hidden) {
		const isMobile = _isMobile()
		app.toggleDevice(isMobile ? 'Mobile' : 'Desktop')

		if (isMobile) {
			app.closeSideBar(true)
		}
	}
}

const isCollapse = computed(() => {
	return !app.sidebar.opened
})

</script>
<template>
  <a-layout :class="classObj" class="app-wrapper">
    <a-layout-sider v-model:collapsed="isCollapse" :trigger="null" collapsible>
      <div class="logo" />
      <sidebar class="sidebar-container" />
    </a-layout-sider>
    <a-layout :class="{hasTagsView: app.tagsView}" class="main-container h-screen">
      <div :class="{'fixed-header': app.fixedHeader}">
        <navbar />
        <tags-view v-if="app.tagsView" />
      </div>
      <a-layout-content class="app-main">
        <app-main />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.module.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 12;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 80px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .app-main {
  /* 50= navbar  50  */
  width: 100%;
  position: relative;
  box-sizing: content-box;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
