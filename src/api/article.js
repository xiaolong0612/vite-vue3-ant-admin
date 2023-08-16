import request from '@/utils/request'

export function getList(params) {
	if (params.createdAt != null) params.createdAt[1] = params.createdAt[1] + ' 23:59:59'
	return request({
		url: '/articles/list',
		method: 'get',
		params
	})
}

export function addArticle(data) {
	return request({
		url: '/articles',
		method: 'post',
		data
	})
}

export function upadteArticle(data) {
	return request({
		url: '/articles',
		method: 'patch',
		data
	})
}
export function delArticle(ids) {
	return request({
		url: '/articles',
		method: 'delete',
		data: ids
	})
}
