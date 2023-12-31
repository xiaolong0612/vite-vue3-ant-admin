/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-09 19:08:29
 * @LastEditTime: 2023-08-26 00:30:34
 * @LastEditors: Amber
 */
export default {
	title: 'Vue Ant Admin',

	lang: 'zh_CN',

	showSettings: true,

	/**
   * @description Whether need tagsView
   */
	tagsView: true,

	/**
   * @description Whether fix the header
   */
	fixedHeader: true,

	/**
   * @description Whether show the logo in sidebar
   */
	sidebarLogo: true,
   
	/**
    * @description iconfont path, 在 iconfont.cn 上生成
    */
	iconfont: '//at.alicdn.com/t/c/font_4212007_2tznd0oifxu.js',

	/**
   * @type 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
	errorLog: ['production', 'development']
}