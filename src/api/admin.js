/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-13 17:20:58
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/admins/login',
		method: 'post',
		data
	})
}

export function getInfo() {
	return request({
		url: '/admins/info',
		method: 'get'
	})
}

export function logout() {
	return request({
		url: '/admins/logout',
		method: 'post'
	})
}

export function getList(params, config) {
	if (params.createdAt != null) params.createdAt[1] = params.createdAt[1] + ' 23:59:59'
	return request({
		url: '/admins/list',
		method: 'get',
		params,
		loading: config.loading,
		msgShow: config.msgShow
	})
}

export function addAdmin(data) {
	return request({
		url: '/admins',
		method: 'post',
		data
	})
}

export function upadteAdmin(data) {
	return request({
		url: '/admins',
		method: 'patch',
		data
	})
}
export function delAdmin(ids) {
	return request({
		url: '/admins',
		method: 'delete',
		data: ids
	})
}
