/*
 * @Description: 加载插件文件
 * @Author: Amber
 * @Date: 2023-03-12 12:50:25
 * @LastEditors: Amber
 * @LastEditTime: 2023-08-10 16:11:56
 */

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app) {
	const files = import.meta.glob('./*.js')
	Object.keys(files).map(async (key)=>{
		files[key]().then((rs) => {
			rs.default(app)
		})
	})
}
