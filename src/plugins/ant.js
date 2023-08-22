/*
 * @Description: ant 组件注入
 * @Author: Amber
 * @Date: 2023-03-16 17:50:20
 * @LastEditTime: 2023-08-21 15:50:41
 * @LastEditors: Amber
 */
import { message } from 'ant-design-vue'
import 'virtual:svg-icons-register'
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/index.vue'

export default function loadComponent(app) {
	app.provide('message', message)
	// 配置全局对象
	app.config.globalProperties.$icons = Icons
	// Antd 注入全部图标（这样注入之后，就可以全局直接使用 icon 组件，不需要每个页面去引入了）
	Object.keys(Icons).forEach(key => {
		app.component(key, Icons[key])
	})
	app.component('Icon', Icon)
}