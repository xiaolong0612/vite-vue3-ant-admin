<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import path from 'path-browserify'
import { usePermissionStore } from '@/stores/permission'

const router = useRouter()
const permission = usePermissionStore()

const searchSelectRef = ref('')
const search = ref()
const options = ref([])
const show = ref(false)
const searchPool = ref([])
const fuse = ref()

onMounted(() => {
	searchPool.value = generateRoutes(permission.routes)
})

watch(() => permission.routes, () => {
	searchPool.value = generateRoutes(permission.routes)
})
watch(() => searchPool.value, (list) => {
	initFuse(list)
})
watch(() => show.value, (val) => {
	if (val) {
		document.body.addEventListener('click', close)
	} else {
		document.body.removeEventListener('click', close)
	}
})

const click = () => {
	show.value = !show.value
	if (show.value) {
		searchSelectRef.value && (searchSelectRef.value).focus()
	}
}
const close = () => {
	options.value = []
	show.value = false
}
const change = (val) => {
	router.push(val)
	search.value = ''
	options.value = []
	nextTick(() => {
		show.value = false
	})
}
const initFuse = (list) => {
	fuse.value = new Fuse(list, {
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: [{
			name: 'title',
			weight: 0.7
		}, {
			name: 'path',
			weight: 0.3
		}]
	})
}
const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
	let res = []

	for (const router of routes) {
		if (router.hidden) { continue }

		const data = {
			path: path.resolve(basePath, router.path),
			title: [...prefixTitle]
		}

		if (router.meta && router.meta.title) {
			data.title = [...data.title, router.meta.title]

			if (router.redirect !== 'noRedirect') {
				res.push(data)
			}
		}

		if (router.children) {
			const tempRoutes = generateRoutes(router.children, data.path, data.title)
			if (tempRoutes.length >= 1) {
				res = [...res, ...tempRoutes]
			}
		}
	}
	return res
}
const querySearch = (val) => {
	if (val !== '') {
		options.value = fuse.value.search(val)
	} else {
		options.value = []
	}
}
</script>
<template>
  <div :class="{'show':show}" class="header-search">
    <a-select
      ref="searchSelectRef"
      v-model:value="search"
      show-search
      class="header-search-select"
      placeholder="Search"
      style="width: 200px"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="querySearch"
      @change="change"
    >
      <a-select-option v-for="item in options" :key="item.item.path" :value="item.item.path">{{ item.item.title.join(' > ') }}</a-select-option>
    </a-select>
    <search-outlined class="search-icon" @click.stop="click" />
  </div>
</template>


<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: all 0.2s;
    width: 0!important;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px!important;
      margin-right: 10px;
    }
  }
}
</style>
