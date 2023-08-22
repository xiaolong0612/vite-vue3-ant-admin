/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 18:58:36
 * @LastEditTime: 2023-08-22 12:19:43
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
	{
		path: '/nested',
		component: () => import('@/layout/index.vue'),
		redirect: '/nested/menu1/menu1-1',
		name: 'Nested',
		meta: {
			title: 'Nested Routes',
			icon: 'nested'
		},
		hidden: 1,
		children: [
			{
				path: 'menu1',
				component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
				name: 'Menu1',
				meta: { title: 'Menu 1' },
				redirect: '/nested/menu1/menu1-1',
				hidden: 1,
				children: [
					{
						path: 'menu1-1',
						component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
						name: 'Menu1-1',
						meta: { title: 'Menu 1-1' }
					},
					{
						path: 'menu1-2',
						component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
						name: 'Menu1-2',
						redirect: '/nested/menu1/menu1-2/menu1-2-1',
						meta: { title: 'Menu 1-2' },
						children: [
							{
								path: 'menu1-2-1',
								component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
								name: 'Menu1-2-1',
								meta: { title: 'Menu 1-2-1' }
							},
							{
								path: 'menu1-2-2',
								component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
								name: 'Menu1-2-2',
								meta: { title: 'Menu 1-2-2' }
							}
						]
					},
					{
						path: 'menu1-3',
						component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
						name: 'Menu1-3',
						meta: { title: 'Menu 1-3' }
					}
				]
			},
			{
				path: 'menu2',
				name: 'Menu2',
				component: () => import('@/views/nested/menu2/index'),
				meta: { title: 'Menu 2' }
			}
		]
	}
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
