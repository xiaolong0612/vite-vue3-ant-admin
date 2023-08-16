/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-16 14:05:35
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import { usePermissionStore } from '../permission'
import { login, logout } from '@/api/admin'

export const useUserStore = defineStore('USER', {
	state:() => ({
		_id: '',
		username: '',
		role: '',
		avatar: '',
		token: ''
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
			usePermissionStore().isUpdate = false
		}
	},
	persist: {
		enabled:true, //开起持久化
		// storage: sessionStorage, //储存模式
		// paths: ['userData'], //指定储存的store
	}
})