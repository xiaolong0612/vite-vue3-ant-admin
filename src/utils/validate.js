/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-10 17:50:24
 * @LastEditTime: 2023-08-10 23:49:11
 * @LastEditors: Amber
 */

export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function isString(str) {
	if (typeof str === 'string') {
		return true
	}
	return false
}

export function isArray(arg) {
	if (typeof Array.isArray === 'undefined') {
		return Object.prototype.toString.call(arg) === '[object Array]'
	}
	return Array.isArray(arg)
}