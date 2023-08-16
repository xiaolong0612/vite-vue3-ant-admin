/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 12:45:08
 * @LastEditTime: 2023-08-16 11:23:18
 * @LastEditors: Amber
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		})
	],
	server: {
		// proxy: {// 跨域代理
		// 	'/admins': {
		// 		target: 'http://127.0.0.1:3000', // 后端提供的接口地址
		// 		changeOrigin: true // 开启跨域代理
		// 	},
		// 	'/users': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	},
		// 	'/roles': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	},
		// 	'/routers': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	},
		// 	'/articles': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	},
		// 	'/rolesRoutes': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	},
		// 	'/upload': {
		// 		target: 'http://127.0.0.1:3000',
		// 		changeOrigin: true
		// 	}
		// }
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
		}
	}
})
