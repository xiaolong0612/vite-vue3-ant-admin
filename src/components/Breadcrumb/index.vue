<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index == breadcrumbs.length - 1" class="no-redirect">{{
        item.meta.title
      }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
import * as pathToRegexp from 'path-to-regexp'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const currentRoute = useRoute()
const router = useRouter()

let breadcrumbs = ref([])

watch(() => currentRoute.path, (path) => {
	if (path.startsWith('/redirect/')) {
		return
	}
	getBreadcrumb()
})

onBeforeMount(() => {
	getBreadcrumb()
})

const getBreadcrumb = () => {
	let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title)
	const frist = matched[0]
	if (!isDashboard(frist)) {
		matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched)
	}
	breadcrumbs.value = matched.filter((item) => {
		return item.meta && item.meta.title && item.meta.breadcrumb !== false
	})
}

const isDashboard = (route) => {
	const name = route && route.name
	if (!name) {
		return false
	}
	return name.toString().trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path) => {
	const { params } = currentRoute
	var toPath = pathToRegexp.compile(path)
	return toPath(params)
}
const handleLink = (item) => {
	const { redirect, path } = item
	if (redirect) {
		router.push(redirect)
		return
	}
	router.push(pathCompile(path))
}

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
