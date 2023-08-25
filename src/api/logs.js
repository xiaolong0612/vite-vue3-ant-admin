/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-25 11:50:27
 * @LastEditTime: 2023-08-25 15:02:36
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function adminLogin(params, config) {
	return request({
		url: '/logs/admin-login',
		method: 'get',
		params,
		loading: config.loading
	})
}
