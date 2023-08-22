/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-21 23:15:14
 * @LastEditors: Amber
 */
import request from '@/utils/request'

// 获取全部路由
export function getRouter() {
	return request({
		url: '/routers/list',
		method: 'get'
	})
}
// add
export function addRouter(data) {
	return request({
		url: '/routers',
		method: 'post',
		data
	})
}
// update
export function upadteRouter(data, config) {
	return request({
		url: '/routers',
		method: 'patch',
		data,
		msgLoading: config?.msgLoading || null
	})
}
// del
export function delRouter(ids) {
	return request({
		url: '/routers',
		method: 'delete',
		data: ids
	})
}