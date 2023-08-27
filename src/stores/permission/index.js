/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-26 12:37:27
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import router from '@/router'
import { getRoleRouters } from '@/api/role'
import Layout from '@/layout/index.vue'
import { deepClone } from '@/utils/index'
import * as _ from 'lodash'

const constantRouterComponents = {
	Layout
}
// 菜单排序
const menuSort = (list) => {
	return _.orderBy(list, ['sort'], ['desc'])
}
/**
 * 标准路由
 * @param {Object} item 
 * @returns 
 */
const formatRouter = (item) => {
	const comp = import.meta.glob('../../views/*/*.vue')
	const { title, icon, auth, sort } = item.meta || {}
	return {
		_id: item._id,
		parent_id: item.parent_id,
		hidden: item.hidden,
		// 路由path，
		path: item.path,
		// 该路由对应页面的 组件
		component: (constantRouterComponents[item.component]) || (comp[`../../views${item.component}.vue`]),
		// meta: 页面标题, 菜单图标, 操作权限
		meta: {
			title: title,
			icon: icon || undefined,
			auth: auth || [],
			sort: sort || 0
		}
	}
}
/**
 * 格式化树形结构数据   生成 vue-router 层级路由表
 */
export const generator = (routerMap) => {
	let res = []
	routerMap.map(item => {
		const currentRouter = formatRouter(item)
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		if (!currentRouter.path.startsWith('http')) {
			currentRouter.path = currentRouter.path.replace('//', '/')
		}
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children)
		}
		res.push(currentRouter)
	})
	return res
}

export const sourceToObj = (list) => {
	let res = {}
	list.map(item => {
		res[item._id] = item || {}
		if (item.children && item.children.length !== 0) {
			res = Object.assign(res, sourceToObj(item.children))
		}
	})
	return res
}

export const usePermissionStore = defineStore('PERMISSION', {
	state:() => ({
		routes: [],
		addRoutes: [],
		routesSource: [],
		routesSourceObj: {},
		routesTable: [],
	}),
	// methods
	actions: {
		generateRoutes() {
			return new Promise((resolve, reject) => {
				getRoleRouters().then(response => {
					const { data } = response
					if (!data) {
						console.error('Verification failed, please Login again.')
					}
					const routers = generator(data.list)
					this.addRoutes = deepClone(routers)
					this.routesSource = data.source
					this.routesSourceObj = deepClone(sourceToObj(data.source))
					this.routesTable = deepClone(this.formatScouceToTable(data.source))
					// 添加404
					routers.push({ path: '/:catchAll(.*)', redirect: '/404', hidden: true })
					this.routes = routers
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
		},
		/**
		 * 格式化为table展示格式
		 */
		formatScouceToTable(children, level = 0) {
			let res = []
			children.map(item => {
				let temp = {}
				if(level == 0){
					if(!item.parent_id){
						temp = item
						const child =  this.routesSource.filter(c_item => c_item.parent_id == item._id)
						if(child.length != 0) temp.children = menuSort(this.formatScouceToTable(child, level+1))
					}
				}else{
					temp = item
					const child =  this.routesSource.filter(c_item => c_item.parent_id == item._id)
					if(child.length != 0) temp.children = menuSort(this.formatScouceToTable(child, level+1))
				}
				if(temp._id) res.push(item)
			})
			return res
		}
	}
})