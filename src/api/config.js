/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-21 00:47:11
 * @LastEditTime: 2023-08-21 02:09:55
 * @LastEditors: Amber
 */
import request from '@/utils/request'
// 时区列表
export function getTimezone() {
	return request({
		url: '/sysConfig/timezone',
		method: 'get',
		msgShow: false
	})
}
// 获取系统配置
export function getConfig() {
	return request({
		url: '/sysConfig',
		method: 'get',
		msgShow: false
	})
}
// 更新系统配置
export function upadteConfig(data, config) {
	return request({
		url: '/sysConfig',
		method: 'patch',
		data,
		msgLoading: config.msgLoading
	})
}
