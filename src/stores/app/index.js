/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-16 14:14:14
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import { localCache } from '@/utils'
import defaultSettings from '@/settings'
import {useDark, useToggle} from '@vueuse/core'
import i18n from '@/locales'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const isDark = useDark()

export const useAppStore = defineStore('APP', {
	state:() => ({
		sidebar: {
			opened: localCache.getItemCache('APP', 'sidebar') ? (localCache.getItemCache('APP', 'sidebar')).opened : true,
			withoutAnimation: false
		},
		device: 'Desktop',
		size: localCache.getItemCache('APP', 'size') || 'medium',
		showSettings: showSettings,
		tagsView: tagsView,
		fixedHeader: fixedHeader,
		sidebarLogo: sidebarLogo,
		theme: isDark.value ? 'dark' : 'light',
		lang: localCache.getItemCache('APP', 'lang') || defaultSettings.lang,
		github: true
	}),
	// computed
	getters: {

	},
	// methods
	actions: {
		changeLang(lang = defaultSettings.lang) {
			this.lang = lang
			i18n.global.locale.value = lang
		},
		toggleSideBar() {
			this.sidebar.opened = !this.sidebar.opened
			this.sidebar.withoutAnimation = false
		},
		closeSideBar(withoutAnimation) {
			this.sidebar.opened = false
			this.sidebar.withoutAnimation = withoutAnimation
		},
		toggleDevice(device) {
			this.device = device
		},
		setSize(size) {
			this.size = size
		},
		switchThemes() {
			const toggleDark = useToggle(isDark)
			this.theme = toggleDark() ? 'dark' : 'light'
		}
	},
	persist: [
		{
			paths: ['sidebar', 'size', 'showSettings', 'lang'],
			storage: localStorage
		},
		{ 
			paths: ['theme', 'github'],
			storage: sessionStorage
		}
	]
})