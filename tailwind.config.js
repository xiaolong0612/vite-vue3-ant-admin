/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 01:06:37
 * @LastEditTime: 2023-08-21 12:08:17
 * @LastEditors: Amber
 */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	corePlugins: {
		preflight: false
	}
}

