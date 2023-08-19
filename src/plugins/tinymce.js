/*
 * @Description: tinymce 组件注入
 * @Author: Amber
 * @Date: 2023-03-16 17:50:20
 * @LastEditTime: 2023-08-20 00:01:39
 * @LastEditors: Amber
 */
import Tinymce from '@/components/Tinymce/index.vue'

export default function loadComponent(app) {
	app.component('Tinymce', Tinymce)
}