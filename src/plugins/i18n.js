/*
 * @Description: 国际化
 * @Author: Amber
 * @Date: 2023-03-16 17:50:20
 * @LastEditTime: 2023-08-10 03:04:04
 * @LastEditors: Amber
 */
import i18n from '@/locales'

export default function loadComponent(app) {
	app.use(i18n)
}