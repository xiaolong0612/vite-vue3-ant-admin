/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:09:00
 * @LastEditTime: 2023-08-21 12:28:05
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
		// if (store.getters.token) {
		//   // let each request carry token
		//   // ['X-Token'] is a custom headers key
		//   // please modify it according to the actual situation
		config.headers['Authorization'] = localCache.getCache('Authorization')
		// }
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
			if(msgShow) message.error(res.msg || 'Error')
			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				localCache.removerCache('USER')
				localCache.removerCache('Authorization')
				// to re-login
				Modal.confirm({
					title: res.msg || '您已注销，可以取消以留在此页面，也可以重新登录',
					icon: createVNode(ExclamationCircleOutlined),
					onOk() {
						location.reload()
					}
				})
			}
			return Promise.reject(new Error(res.msg || 'Error'))
		} else {
			if(res.msg && msgShow) message.success(res.msg)
			return res
		}
	},
	error => {
		if (error.config.loading) error.config.loading.value = false
		if(error.config.msgLoading) error.config.msgLoading()
		console.log('err' + error) // for debug
		message.error(error.message || 'Error')
		return Promise.reject(error)
	}
)

export default service
