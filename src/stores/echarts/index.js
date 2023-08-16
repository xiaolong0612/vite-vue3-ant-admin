/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-20 23:44:56
 * @LastEditTime: 2023-08-10 00:40:40
 * @LastEditors: Amber
 */
import { defineStore } from 'pinia'
import * as echarts from 'echarts'

export const useEchartsStore = defineStore('ECHARTS', {
	state:() => ({
		echarts: echarts
	})
})