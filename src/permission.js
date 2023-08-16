/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-16 14:03:41
 * @LastEditors: Amber
 */
import router from './router'
import { localCache } from '@/utils'
import getPageTitle from '@/utils/get-page-title'
import { message } from 'ant-design-vue'
import { start, close } from '@/utils/nporgress' // 导入进度条
import pinia from '@/stores/index'
import { usePermissionStore } from '@/stores/permission'
// fix router使用pinia报错
const permission = usePermissionStore(pinia)

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, _, next) => {
	start()
	// set page title
	document.title = getPageTitle(to.meta.title)

	// determine whether the user has logged in
	const hasToken = localCache.getItemCache('USER', 'token')
	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' })
			close()
		} else {
			const isUpdate = permission.isUpdate
			if (isUpdate) {
				next()
			} else {
				try {
					// 动态路由
					await permission.generateRoutes()
					next({ ...to, replace: true })
				} catch (error) {
					console.log(error)
					message.error(error || 'Has Error')
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