/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-25 11:51:04
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function getList(params, config) {
	return request({
		url: '/articles/list',
		method: 'get',
		params,
		loading: config.loading
	})
}

export function addArticle(data) {
	return request({
		url: '/articles',
		method: 'post',
		data
	})
}

export function upadteArticle(data, config) {
	return request({
		url: '/articles',
		method: 'patch',
		data,
		msgLoading: config.msgLoading
	})
}
export function delArticle(ids) {
	return request({
		url: '/articles',
		method: 'delete',
		data: ids
	})
}
