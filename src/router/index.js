/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 18:58:36
 * @LastEditTime: 2023-08-16 19:15:19
 * @LastEditors: Amber
 */
import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/layout/index.vue'
export const constantRoutes = [
	{
		path: '/redirect/:path(.*)',
		component: () => import('@/views/redirect/index.vue')
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/error-page/404.vue'),
		hidden: true
	},
	// {
	//   path: '/',
	//   component: Layout,
	//   redirect: '/dashboard',
	//   children: [
	//     {
	//       path: 'dashboard',
	//       component: () => import('@/views/dashboard/index.vue'),
	//       name: 'Dashboard',
	//       meta: { title: 'Dashboard', icon: 'Monitor', affix: true }
	//     }
	//   ]
	// }
	// {
	// 	path: '/auth',
	// 	component: Layout,
	// 	meta: {
	// 		title: '权限管理',
	// 		icon: 'el-icon-s-help',
	// 		roles: ['admin']
	// 	},
	// 	children: [{
	// 		path: 'index',
	// 		name: 'Admin',
	// 		component: () => import('@/views/auth/index.vue'),
	// 		meta: { title: '管理员' }
	// 	}, {
	// 		path: 'roles',
	// 		name: 'Roles',
	// 		component: () => import('@/views/auth/roles.vue'),
	// 		meta: { title: '角色管理' }
	// 	}, {
	// 		path: 'routers',
	// 		name: 'Routers',
	// 		component: () => import('@/views/auth/routers.vue'),
	// 		meta: { title: '菜单管理' }
	// 	}]
	// },
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: constantRoutes
})

export default router
