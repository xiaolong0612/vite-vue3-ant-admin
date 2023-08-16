/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 03:04:59
 * @LastEditTime: 2023-08-16 14:12:55
 * @LastEditors: Amber
 */
import { createI18n } from 'vue-i18n'
import settings from '@/settings'

// UI组件 中的语言配置
// import elementEnLocale from 'element-plus/lib/locale/lang/en'
// import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import en_US from 'ant-design-vue/es/locale/en_US'

// 自己的语言配置
import enLocale from './en'
import zhLocale from './zh-cn'
import { localCache } from '@/utils'

// 语言配置整合
export const messages = {
	en: {
		...enLocale,
		...en_US
	},
	'zh-cn': {
		...zhLocale,
		...zh_CN
	}
}

console.log(localCache.getItemCache('APP', 'lang') || settings.lang)

// 创建 i18n
const i18n = createI18n({
	legacy: false,
	globalInjection: true,  // 全局模式，可以直接使用 $t
	locale: localCache.getItemCache('APP', 'lang') || settings.lang,
	messages: messages
})
export default i18n