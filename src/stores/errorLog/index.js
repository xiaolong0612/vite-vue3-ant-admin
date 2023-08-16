/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-15 11:07:07
 * @LastEditTime: 2023-08-11 00:26:33
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'

export const useErrorLogStore = defineStore('ERRORLOG', {
	state:() => ({
		logs: []
	}),
	actions: {
		addErrorLog(log) {
			this.logs.push(log)
		},
		clearErrorLog() {
			useErrorLogStore().$reset()
		}
	}
})