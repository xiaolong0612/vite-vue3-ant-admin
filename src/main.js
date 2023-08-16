/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 12:45:08
 * @LastEditTime: 2023-08-15 18:26:17
 * @LastEditors: Amber
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import pinia from '@/stores'
import { loadAllPlugins } from '@/plugins'

import 'virtual:svg-icons-register'
import './styles/_index.scss'
import './permission'

import App from './App.vue'

const app = createApp(App)

// 加载所有插件
loadAllPlugins(app)

app.use(Antd)
app.use(router)
app.use(pinia)

app.mount('#app')
