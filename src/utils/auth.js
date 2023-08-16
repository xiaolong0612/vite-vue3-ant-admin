/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:09:00
 * @LastEditTime: 2023-08-16 11:20:44
 * @LastEditors: Amber
 */
import Cookies from 'js-cookie'

const TokenKey = 'ADMIN_TOKEN'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}
