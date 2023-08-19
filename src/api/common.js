/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 00:24:35
 * @LastEditTime: 2023-08-20 00:29:39
 * @LastEditors: Amber
 */
import request from '@/utils/request'

export function upload(data) {
	return request({
		url: '/upload',
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data
	})
}