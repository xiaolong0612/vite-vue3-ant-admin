import { parseTime, formatImgPath } from '@/utils/index'

const fn = {
	parseTime,
	formatImgPath
}

export default function loadComponent(app) {
	Object.keys(fn).map(key => app.config.globalProperties[`$${key}`] = fn[key])
}