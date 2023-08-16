/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-15 16:41:26
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import router from '@/router'
import { getList as getRouter } from '@/api/router'
import Layout from '@/layout/index.vue'
const constantRouterComponents = {
	Layout
}

// interface RouteMetaRoles extends RouteMeta {
//   roles: Array<string>
// }

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route?.meta?.roles) {
		return roles.some(role => route?.meta?.roles?.includes(role))
	} else {
		return true
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

/**
 * 格式化树形结构数据   生成 vue-router 层级路由表
 */
export const generator = (routerMap) => {
	return routerMap.map(item => {
		const comp = import.meta.glob('../../views/*/*.vue')

		const { title, icon, auth, sort } = item.meta || {}
		const currentRouter = {
			_id: item._id,
			parent_id: item.parent_id,
			hidden: item.hidden,
			// 路由path，
			path: item.path,
			// 路由名称，建议唯一
			name: item.name,
			// 该路由对应页面的 组件
			component: (constantRouterComponents[item.component]) || (comp[`../../views/${item.component}.vue`]),
			// fix cascader组件无法通过meta.title读取到内容
			title: title,
			// table展示使用
			componentStr: item.component,
			// meta: 页面标题, 菜单图标, 操作权限
			meta: {
				title: title,
				icon: icon || undefined,
				auth: auth || [],
				sort: sort || 0
			}
		}
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		if (!currentRouter.path.startsWith('http')) {
			currentRouter.path = currentRouter.path.replace('//', '/')
		}
		// 重定向
		item.redirect && (currentRouter.redirect = item.redirect)
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children, currentRouter)
		}
		return currentRouter
	})
}

export const source = (list) => {
	let res = {}
	list.map(item => {
		res[item._id] = item || {}
		if (item.children && item.children.length !== 0) {
			res = Object.assign(res, source(item.children))
		}
	})
	return res
}

export const usePermissionStore = defineStore('PERMISSION', {
	state:() => ({
		isUpdate: false,
		routesSource: [],
		routes: [],
		addRoutes: [],
	}),
	// methods
	actions: {
		generateRoutes() {
			return new Promise((resolve, reject) => {
				getRouter().then(response => {
					const { data } = response
					if (!data) {
						return reject('Verification failed, please Login again.')
					}
					const routers = generator(data.list)
					// 添加404
					routers.push({ path: '/:catchAll(.*)', redirect: '/404', hidden: true })
					this.routes = routers
					this.routesSource = source(routers)
					this.isUpdate = true
					this.pushRoutes(routers)
					resolve(routers)
				}).catch(error => {
					reject(error)
				})
			})
		},
		pushRoutes(routes) {
			routes.map(item => {
				router.addRoute(item)
			})
		}
	},
	persist: {
		enabled:true,
	}
})