/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:09:00
 * @LastEditTime: 2023-08-25 18:50:24
 * @LastEditors: Amber
 */
import axios from 'axios'
import { createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { localCache } from '@/utils'

// create an axios instance
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		if (config.loading) {
			config.loading.value = true
		}
		config.headers['Authorization'] = localCache.getCache('Authorization')
		const lang = localCache.getItemCache('APP', 'config')?.lang
		if(lang){
			config.headers['accept-language'] = lang
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

	/**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
	 * loading axiso 请求loading控制
	 * msgShow 请求msg是否弹出，默认true
   */
	response => {
		if(response.headers.authorization){
			localCache.setCache('Authorization', response.headers.authorization)
		}
		if (response.config.loading) response.config.loading.value = false
		const msgShow = response.config.msgShow == undefined ? true : response.config.msgShow
		if(response.config.msgLoading) response.config.msgLoading()
		const res = response.data
		// if the custom code is not 20000, it is judged as an error.
		if (res.code !== 20000) {
			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if ([50008, 50012, 50014].includes(res.code)) {
				localCache.removeCache('USER')
				localCache.removeCache('Authorization')
				// to re-login
				Modal.confirm({
					title: res.msg || '您已注销，可以取消以留在此页面，也可以重新登录',
					icon: createVNode(ExclamationCircleOutlined),
					onOk() {
						location.reload()
					}
				})
			} else {
				if(msgShow) message.error(res.msg || 'Error')
				return res
			}
		} else {
			if(res.msg && msgShow) message.success(res.msg)
			return res
		}
	},
	error => {
		if (error.config?.loading) error.config.loading.value = false
		if(error.config?.msgLoading) error.config.msgLoading()
		console.log('err' + error) // for debug
		message.error(error.message || 'Error')
		return Promise.reject(error)
	}
)

export default service
