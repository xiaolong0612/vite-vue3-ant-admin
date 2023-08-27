/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-27 12:23:09
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import { localCache, sessionCache } from '@/utils'
import * as _ from 'lodash'
import defaultSettings from '@/settings'
import {useDark, useToggle} from '@vueuse/core'
import i18n from '@/locales'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
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
				this.dayjsLang()
			})
		},
		changeLang(lang = defaultSettings.lang) {
			this.lang = lang
			i18n.global.locale.value = lang
			
			this.dayjsLang()
		},
		dayjsLang() {
			let dayLang = _.replace(_.toLower(this.lang), '_', '-')
			if(this.lang == 'en_US') dayLang = 'en'
			dayjs.locale(dayLang)
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