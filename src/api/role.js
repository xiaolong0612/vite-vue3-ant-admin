/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-21 23:12:40
 * @LastEditors: Amber
 */
import request from '@/utils/request'
// 获取角色列表
export function getList(config) {
	return request({
		url: '/roles/list',
		method: 'get',
		loading: config.loading || null,
		msgShow: config.msgShow
	})
}
// 添加角色
export function addRole(data) {
	return request({
		url: '/roles',
		method: 'post',
		data
	})
}
// 更新角色
export function upadteRole(data) {
	return request({
		url: '/roles',
		method: 'patch',
		data
	})
}
// 删除角色
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

// 根据登陆角色获取路由节点---标准路由数据
export function getRoleRouters() {
	return request({
		url: '/roles/routers',
		method: 'get'
	})
}

// 获取角色节点--数据未格式化为标准路由
export function getRoleRoute(data, config) {
	return request({
		url: '/roles/list/roleRoute',
		method: 'post',
		data,
		loading: config.loading
	})
}