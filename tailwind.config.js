/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-10 01:06:37
 * @LastEditTime: 2023-08-26 00:05:20
 * @LastEditors: Amber
 */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	corePlugins: {
		preflight: false
	}
}

