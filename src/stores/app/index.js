/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-25 22:51:13
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import { localCache, sessionCache } from '@/utils'
import defaultSettings from '@/settings'
import {useDark, useToggle} from '@vueuse/core'
import i18n from '@/locales'
import { getConfig, getTimezone } from '@/api/config'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const isDark = useDark()
export const useAppStore = defineStore('APP', {
	state:() => ({
		title: null,
		sidebar: {
			opened: localCache.getItemCache('APP', 'sidebar') ? (localCache.getItemCache('APP', 'sidebar')).opened : true,
			withoutAnimation: false
		},
		sidebarLogo: sidebarLogo,
		sidebarOpenKeys: sessionCache.getItemCache('APP', 'sidebarOpenKeys') || [],
		sidebarSelectKeys: sessionCache.getItemCache('APP', 'sidebarSelectKeys') || [],
		device: 'Desktop',
		size: localCache.getItemCache('APP', 'size') || 'medium',
		showSettings: showSettings,
		tagsView: tagsView,
		fixedHeader: fixedHeader,
		theme: isDark.value ? 'dark' : 'light',
		github: false,
		config: localCache.getItemCache('APP', 'config'),
		timezone: []
	}),
	// computed
	getters: {

	},
	// methods
	actions: {
		async initConfig() {
			const timezone = await getTimezone()
			this.timezone = timezone.data
			getConfig().then(result => {
				this.config = result.data
			})
		},
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
			paths: ['sidebar', 'size', 'showSettings', 'config'],
			storage: localStorage
		}, {
			paths: ['theme', 'github', 'sidebarOpenKeys', 'sidebarSelectKeys'],
			storage: sessionStorage
		}
	]
})