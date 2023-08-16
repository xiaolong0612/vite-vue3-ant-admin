/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:02:18
 * @LastEditTime: 2023-08-14 14:40:32
 * @LastEditors: Amber
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia