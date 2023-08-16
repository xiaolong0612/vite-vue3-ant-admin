/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-03-11 22:27:56
 * @LastEditTime: 2023-08-10 23:50:20
 * @LastEditors: Amber
 */

import { useErrorLogStore } from '@/stores/errorLog'
import { isString, isArray } from '@/utils/validate'
import defaultSettings from '@/settings'
const { errorLog: needErrorLog } = defaultSettings

export function checkNeed() {
	const env = import.meta.env.MODE
	if (isString(needErrorLog)) {
		return env === needErrorLog
	}
	if (isArray(needErrorLog)) {
		return needErrorLog.includes(env)
	}
	return false
}

export default function errorHandler(app) {
	if (checkNeed()) {
		app.config.errorHandler = (err, instance, info) => {
			// 处理错误，例如：报告给一个服务
			useErrorLogStore().addErrorLog({
				err,
				instance,
				info,
				url: window.location.href
			})
		}
	}
}