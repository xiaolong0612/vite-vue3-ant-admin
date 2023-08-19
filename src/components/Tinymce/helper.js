/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-19 23:53:11
 * @LastEditTime: 2023-08-19 23:53:48
 * @LastEditors: Amber
 */
const validEvents = ['onActivate', 'onAddUndo', 'onBeforeAddUndo', 'onBeforeExecCommand', 'onBeforeGetContent', 'onBeforeRenderUI', 'onBeforeSetContent', 'onBeforePaste', 'onBlur', 'onChange', 'onClearUndos', 'onClick', 'onContextMenu', 'onCopy', 'onCut', 'onDblclick', 'onDeactivate', 'onDirty', 'onDrag', 'onDragDrop', 'onDragEnd', 'onDragGesture', 'onDragOver', 'onDrop', 'onExecCommand', 'onFocus', 'onFocusIn', 'onFocusOut', 'onGetContent', 'onHide', 'onInit', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoadContent', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onNodeChange', 'onObjectResizeStart', 'onObjectResized', 'onObjectSelected', 'onPaste', 'onPostProcess', 'onPostRender', 'onPreProcess', 'onProgressState', 'onRedo', 'onRemove', 'onReset', 'onSaveContent', 'onSelectionChange', 'onSetAttrib', 'onSetContent', 'onShow', 'onSubmit', 'onUndo', 'onVisualAid']

const isValidKey = (key) => validEvents.indexOf(key) !== -1

export const bindHandlers = (initEvent, listeners, editor) => {
	Object.keys(listeners)
		.filter(isValidKey)
		.forEach((key) => {
			const handler = listeners[key]
			if (typeof handler === 'function') {
				if (key === 'onInit') {
					handler(initEvent, editor)
				} else {
					editor.on(key.substring(2), (e) => handler(e, editor))
				}
			}
		})
}