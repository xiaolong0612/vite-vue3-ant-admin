/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 03:04:59
 * @LastEditTime: 2023-08-23 23:20:03
 * @LastEditors: Amber
 */
import { createI18n } from 'vue-i18n'
import settings from '@/settings'

// UI组件 中的语言配置
import ant_zh_CN from 'ant-design-vue/es/locale/zh_CN'
import ant_en_US from 'ant-design-vue/es/locale/en_US'

// 自己的语言配置
import enLocale from './en_US'
import zhLocale from './zh_CN'
import { localCache } from '@/utils'

// 语言配置整合
export const messages = {
	'zh_CN': {
		...zhLocale,
		...ant_zh_CN
	},
	'en_US': {
		...enLocale,
		...ant_en_US
	}
}

export const languagesPackage = [
	{
		label: '中文',
		value: 'zh_CN'
	}, {
		label: '英文',
		value: 'en_US'
	}
]

console.log(localCache.getItemCache('APP', 'lang') || settings.lang)

// 创建 i18n
const i18n = createI18n({
	legacy: false,
	globalInjection: true,  // 全局模式，可以直接使用 $t
	locale: localCache.getItemCache('APP', 'config').lang || settings.lang,
	messages: messages
})
export default i18n