/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:09:00
 * @LastEditTime: 2023-08-23 19:22:56
 * @LastEditors: Amber
 */
import defaultSettings from '@/settings'
import { localCache } from '@/utils'

const title = localCache.getItemCache('APP', 'config')?.title || defaultSettings.title

export default function getPageTitle(pageTitle) {
	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}
