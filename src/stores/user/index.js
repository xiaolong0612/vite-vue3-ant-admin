/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-21 22:56:55
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import { usePermissionStore } from '../permission'
import { login, logout } from '@/api/admin'
import { localCache } from '@/utils'

export const useUserStore = defineStore('USER', {
	state:() => ({
		_id: '',
		username: '',
		role: '',
		avatar: ''
	}),
	// computed
	getters: {

	},
	// methods
	actions: {
		login(userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(result => {
					if (result.code === 20000) {
						const { data } = result
						this.$patch({
							...data,
						})
						resolve(result)
					} else {
						reject()
					}
				})
			})
		},
		logout() {
			return new Promise((resolve, reject) => {
				logout({token: this.token}).then(result => {
					if (result.code === 20000) {
						this.resetToken()
						resolve()
					} else {
						reject()
					}
				})
			})
		},
		resetToken() {
			useUserStore().$reset()
			localCache.removeCache('Authorization')
			usePermissionStore().isUpdate = false
		}
	},
	persist: true
})