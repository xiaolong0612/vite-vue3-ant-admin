/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 00:25:11
 * @LastEditTime: 2023-08-23 20:42:43
 * @LastEditors: Amber
 */
import request from '@/utils/request'
// 登陆
export function message(data) {
	return request({
		url: '/i18n',
		method: 'get',
		headers: {
			'accept-language': data
		}
	})
}