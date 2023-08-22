/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 12:45:08
 * @LastEditTime: 2023-08-21 22:46:34
 * @LastEditors: Amber
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import pinia from '@/stores'
import { loadAllPlugins } from '@/plugins'

import './styles/_index.scss'
import permission from './permission'

import App from './App.vue'
const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(pinia)

// 加载所有插件
loadAllPlugins(app)
permission(pinia)

app.mount('#app')
