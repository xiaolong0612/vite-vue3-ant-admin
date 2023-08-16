<script setup>
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Search from '@/components/HeaderSearch/index.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
// import Theme from '@/components/Theme/index.vue'
// import Lang from './i18n/index.vue'
const toggleSideBar = () => {
	app.sidebar.opened = !app.sidebar.opened
}
const app = useAppStore()
const user = useUserStore()

const logout = () => {
	user.logout().then(() => {
		location.reload()
	})
}
</script>
<template>
  <div class="navbar flex justify-between">
    <div class="flex items-center">
      <hamburger id="hamburger-container" :is-active="app.sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu flex items-center">
      <search id="header-search" class="right-menu-item"/>
      <ErrorLog class="right-menu-item" />
      <!-- <Theme class="right-menu-item" />
      <Lang class="right-menu-item" /> -->
      <div class="avatar-container right-menu-item hover-effect">
        <a-dropdown>
          <div class="avatar-wrapper flex items-end">
            <img :src="$formatImgPath(user.avatar)" class="user-avatar">
            <DownOutlined class="text-sm" />
          </div>
          <template #overlay>
            <a-menu>
              <router-link to="/">
                <a-menu-item>Dashboard</a-menu-item>
              </router-link>
              <a target="_blank" href="https://github.com/xiaolong0612/vite-vue3-ts-elementplus-admin">
                <a-menu-item>Github</a-menu-item>
              </a>
              <a-menu-item divided @click="logout">
                <span style="display:block;">Log Out</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background-image: radial-gradient(transparent 1px,#fff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  // background-color: #fff;

  .hamburger-container {
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
