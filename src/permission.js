/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-22 02:40:05
 * @LastEditors: Amber
 */
import router from './router'
import { localCache } from '@/utils'
import getPageTitle from '@/utils/get-page-title'
import { message } from 'ant-design-vue'
import { start, close } from '@/utils/nporgress' // 导入进度条
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'

// fix stores 多处导入导致缓存无效
export default function permission(pinia) {
	// fix router使用pinia报错
	const app = useAppStore(pinia)
	const permission = usePermissionStore(pinia)

	const whiteList = ['/login'] // no redirect whitelist

	router.beforeEach(async(to, _, next) => {
		start()
		// set page title
		document.title = getPageTitle(to.meta.title)

		// determine whether the user has logged in
		const hasToken = localCache.getCache('Authorization')
		if (hasToken) {
			if (to.path === '/login') {
				// if is logged in, redirect to the home page
				next({ path: '/' })
				close()
			} else {
				const isUpdate = permission.addRoutes.length
				if (isUpdate) {
					next()
				} else {
					try {
						// 获取系统配置
						await app.initConfig()
						// 动态路由
						await permission.generateRoutes()
						// 刷新时，保持路由地址不变
						let hasSelect = permission.routesSource.filter(item => item._id == app.sidebarSelectKeys[0])
						let toRoute = hasSelect.length != 0 ? hasSelect[0] : permission.addRoutes[0]
						next({ ...toRoute, replace: true })
					} catch (error) {
						console.log(error)
						message.error(error.message || 'Has Error')
						next(`/login?redirect=${to.path}`)
						close()
					}
				}
			}
		} else {
			if (whiteList.indexOf(to.path) !== -1) {
				// in the free login whitelist, go directly
				next()
			} else {
				// other pages that do not have permission to access are redirected to the login page.
				next(`/login?redirect=${to.path}`)
				close()
			}
		}
	})

	router.afterEach(() => {
		// finish progress bar
		close()
	})
}