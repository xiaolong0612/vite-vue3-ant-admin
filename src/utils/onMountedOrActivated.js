/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 00:05:46
 * @LastEditTime: 2023-08-20 00:06:24
 * @LastEditors: Amber
 */
import { nextTick, onMounted, onActivated } from 'vue'

export function onMountedOrActivated(hook) {
	let mounted
	onMounted(() => {
		hook()
		nextTick(() => {
			mounted = true
		})
	})
	onActivated(() => {
		if (mounted) {
			hook()
		}
	})
}
