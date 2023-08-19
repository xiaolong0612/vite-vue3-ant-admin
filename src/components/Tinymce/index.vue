<template>
  <div class="prefixCls" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" ref="elRef" :style="{ visibility: 'hidden' }"></textarea>
  </div>
</template>

<script setup>
import tinymce from 'tinymce'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/advlist'
// import "tinymce/plugins/anchor";  // 锚点
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
// import "tinymce/plugins/codesample"; //编辑插入代码样本实例
import 'tinymce/plugins/directionality'
// import 'tinymce/plugins/fullscreen'  // 全屏
// import "tinymce/plugins/hr"; //水平分割线
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
// import "tinymce/plugins/media"; // 编辑、插入媒体
// import "tinymce/plugins/nonbreaking"; //插入、不间断空间
import 'tinymce/plugins/noneditable'
// import "tinymce/plugins/pagebreak";  //分页符
import 'tinymce/plugins/paste'
// import "tinymce/plugins/preview";  //预览
// import "tinymce/plugins/print";  //打印
import 'tinymce/plugins/save'
// import "tinymce/plugins/searchreplace"; // 搜索和替换
// import "tinymce/plugins/spellchecker";  //拼写检查器
import 'tinymce/plugins/tabfocus'
// import "tinymce/plugins/template";  //插入模板
// import "tinymce/plugins/textpattern";  // 文本模式
// import "tinymce/plugins/visualblocks"; // 可视化快
// import "tinymce/plugins/visualchars"; //可视字符
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/image'
// import 'tinymce/plugins/table';

import { computed, nextTick, ref, unref, watch, onDeactivated, onBeforeUnmount, defineProps, defineEmits, getCurrentInstance } from 'vue'
// eslint-disable-next-line vue/no-dupe-keys
import { toolbar, plugins } from './tinymce'
import { bindHandlers } from './helper'
import { buildShortUUID, isNumber } from '@/utils/tinymce.js'
import { onMountedOrActivated } from '@/utils/onMountedOrActivated.js'
import { upload } from '@/api/common'
const props = defineProps({
	options: {
		type: Object,
		default: () => {},
	},
	value: {
		type: String,
	},

	toolbar: {
		type: Array,
		default: toolbar,
	},
	plugins: {
		type: Array,
		default: plugins,
	},
	modelValue: {
		type: String,
	},
	height: {
		type: [Number, String],
		required: false,
		default: 400,
	},
	width: {
		type: [Number, String],
		required: false,
		default: 'auto',
	},
	showImageUpload: {
		type: Boolean,
		default: true,
	},
})
/** 一个页面调用多次，就多建立几个change事件绑定  */
const emits = defineEmits(['change','change1', 'update:modelValue', 'inited', 'init-error'])
const { attrs, proxy } = getCurrentInstance()
const tinymceId = ref(buildShortUUID('tiny-vue'))
const containerWidth = computed(() => {
	const width = props.width
	if (isNumber(width)) {
		return `${width}px`
	}
	return width
})
const editorRef = ref(null)
// const fullscreen = ref(false);
const elRef = ref(null)
// const tinymceContent = computed(() => props.modelValue)
// const uploadUrl = ref(import.meta.env.VITE_APP_BASE_API + '/uploads')  
const initOptions = computed(() => {
	const { height, options, toolbar, plugins } = props
	// const publicPath = '/'
	return {
		selector: `#${unref(tinymceId)}`,
		height,
		toolbar,
		menubar: 'file edit insert view format table',
		plugins,
		language_url: '/resource/langs/zh_CN.js',
		language: 'zh_CN',
		branding: false,
		default_link_target: '_blank',
		link_title: false,
		object_resizing: false,
		auto_focus: true,
		skin: 'oxide',
		skin_url: '/resource/skins/ui/oxide',
		content_css: '/resource/skins/ui/oxide/content.min.css',
		// 图片本地上传方法  点击上传后执行的事件
		images_upload_handler: (blobInfo, success, failure) => {
			handleImgUpload(blobInfo, success, failure)
		},
		...options,
		setup: (editor) => {
			editorRef.value = editor
			editor.on('init', (e) => initSetup(e))
		},
	}
})
// 上传本地 图片执行事件
function handleImgUpload(blobInfo, success, failure) {
	let formdata = new FormData()
	// append 方法中的第一个参数就是 我们要上传文件 在后台接收的文件名
	// 这个值要根据后台来定义
	// 第二个参数是我们上传的文件
	formdata.append('file', blobInfo.blob())
	// axios 定义上传方法
	upload(formdata).then(result => {
		success(proxy.$formatImgPath(result.data))
	}).catch(() => {
		failure('HTTP Error: 上传失败')
	})
}

// const disabled = computed(() => {
// 	const { options } = props
// 	const getdDisabled = options && Reflect.get(options, 'readonly')
// 	const editor = unref(editorRef)
// 	if (editor) {
// 		editor.setMode(getdDisabled ? 'readonly' : 'design')
// 	}
// 	return getdDisabled ?? false
// })

watch(
	() => attrs.disabled,
	() => {
		const editor = unref(editorRef)
		if (!editor) {
			return
		}
		editor.setMode(attrs.disabled ? 'readonly' : 'design')
	}
)

onMountedOrActivated(() => {
	if (!initOptions.value.inline) {
		tinymceId.value = buildShortUUID('tiny-vue')
	}
	nextTick(() => {
		setTimeout(() => {
			initEditor()
		}, 30)
	})
})

onBeforeUnmount(() => {
	destory()
})

onDeactivated(() => {
	destory()
})

function destory() {
	if (tinymce !== null) {
		// tinymce?.remove?.(unref(initOptions).selector!);
	}
}

function initSetup(e) {
	const editor = unref(editorRef)
	if (!editor) {
		return
	}
	const value = props.modelValue || ''

	editor.setContent(value)
	bindModelHandlers(editor)
	bindHandlers(e, attrs, unref(editorRef))
}

function initEditor() {
	const el = unref(elRef)
	if (el) {
		el.style.visibility = ''
	}
	tinymce
		.init(unref(initOptions))
		.then((editor) => {
			emits('inited', editor)
		})
		.catch((err) => {
			emits('init-error', err)
		})
}

function setValue(editor, val, prevVal) {
	if (editor && typeof val === 'string' && val !== prevVal && val !== editor.getContent({ format: attrs.outputFormat })) {
		editor.setContent(val)
	}
}

function bindModelHandlers(editor) {
	const modelEvents = attrs.modelEvents ? attrs.modelEvents : null
	const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents

	watch(
		() => props.modelValue,
		(val, prevVal) => {
			setValue(editor, val, prevVal)
		}
	)

	watch(
		() => props.value,
		(val, prevVal) => {
			setValue(editor, val, prevVal)
		},
		{
			immediate: true,
		}
	)
	/** 一个页面调用多次，就多建立几个change事件绑定  */
	editor.on(normalizedEvents || 'change change1 keyup undo redo', () => {
		const content = editor.getContent({ format: attrs.outputFormat })
		emits('update:modelValue', content)
		emits('change', content)
		emits('change1', content)
	})

	// editor.on('FullscreenStateChanged', (e) => {
	// 	fullscreen.value = e.state
	// })
}

// function handleImageUploading(name) {
// 	const editor = unref(editorRef)
// 	if (!editor) {
// 		return
// 	}
// 	editor.execCommand('mceInsertContent', false, getUploadingImgName(name))
// 	const content = editor?.getContent() ?? ''
// 	setValue(editor, content)
// }

// function handleDone(name, url) {
// 	const editor = unref(editorRef)
// 	if (!editor) {
// 		return
// 	}
// 	const content = editor?.getContent() ?? ''
// 	const val = content?.replace(getUploadingImgName(name), `<img src="${url}"/>`) ?? ''
// 	setValue(editor, val)
// }

// function getUploadingImgName(name) {
// 	return `[uploading:${name}]`
// }
</script>

<style lang="scss" scoped>
.prefixCls {
  position: relative;
  line-height: normal;
}
textarea {
  z-index: -1;
  visibility: hidden;
}
:deep(.tox-tbtn__select-label) {
  width: 3em !important;
}
</style>