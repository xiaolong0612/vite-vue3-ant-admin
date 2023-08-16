/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-15 16:31:18
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function getList() {
	return request({
		url: '/roles/list/role',
		method: 'get'
	})
}

export function getRouter() {
	return request({
		url: '/routers/router',
		method: 'get'
	})
}

export function addRouter(data) {
	return request({
		url: '/routers',
		method: 'post',
		data
	})
}

export function upadteRouter(data, config) {
	return request({
		url: '/routers',
		method: 'patch',
		data,
		msgLoading: config?.msgLoading || null
	})
}
export function delRouter(ids) {
	return request({
		url: '/routers',
		method: 'delete',
		data: ids
	})
}