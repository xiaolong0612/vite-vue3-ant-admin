/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-21 01:47:42
 * @LastEditors: Amber
 */
import request from '@/utils/request'
// 登陆
export function login(data) {
	return request({
		url: '/admins/login',
		method: 'post',
		data
	})
}
// 暂时无用--获取用户信息
export function getInfo() {
	return request({
		url: '/admins/info',
		method: 'get'
	})
}
// 退出登陆
export function logout() {
	return request({
		url: '/admins/logout',
		method: 'post'
	})
}
// 获取管理员列表
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
// 添加管理员
export function addAdmin(data) {
	return request({
		url: '/admins',
		method: 'post',
		data
	})
}
// 更新管理员信息
export function upadteAdmin(data) {
	return request({
		url: '/admins',
		method: 'patch',
		data
	})
}
// 修改密码
export function upadtePwd(data) {
	return request({
		url: '/admins/pwd',
		method: 'patch',
		data
	})
}
// 删除管理员
export function delAdmin(ids) {
	return request({
		url: '/admins',
		method: 'delete',
		data: ids
	})
}
