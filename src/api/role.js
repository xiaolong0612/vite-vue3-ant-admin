/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-15 11:36:55
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function getList(config) {
	return request({
		url: '/roles/list',
		method: 'get',
		loading: config.loading || null,
		msgShow: config.msgShow
	})
}

export function getRouter() {
	return request({
		url: '/roles/router',
		method: 'get'
	})
}

export function addRole(data) {
	return request({
		url: '/roles',
		method: 'post',
		data
	})
}

export function upadteRole(data) {
	return request({
		url: '/roles',
		method: 'patch',
		data
	})
}
export function delRole(ids) {
	return request({
		url: '/roles',
		method: 'delete',
		data: ids
	})
}

// 角色添加节点
export function addRoleRoute(data) {
	return request({
		url: '/rolesRoutes',
		method: 'post',
		data
	})
}
// 获取角色节点
export function getRoleRoute(data, config) {
	return request({
		url: '/roles/list/roleRoute',
		method: 'post',
		data,
		loading: config.loading
	})
}