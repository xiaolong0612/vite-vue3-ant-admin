<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 21:23:25
 * @LastEditTime: 2023-08-22 17:04:52
 * @LastEditors: Amber
-->
<script setup>
import { onMounted, reactive, inject, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { deepClone } from '@/utils/index'
import { upadteConfig } from '@/api/config'

const $msg = inject('message')
const app = useAppStore()

const config = reactive(deepClone(app.config))

const onFinish = values => {
	const hide = $msg.loading('更新中...', 0)
	upadteConfig(app.config, {msgLoading: hide})
	console.log('Success:', values)
}
const onFinishFailed = errorInfo => {
	console.log('Failed:', errorInfo)
}
const reset = () => {
	Object.assign(app.config, deepClone(config))
}
onMounted(() => {
	// init()
})
onUnmounted(() => {
	reset()
})
</script>
<template>
  <a-row>
    <a-col :span="12">
      <a-form
        :model="app.config"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="平台名称"
          name="title"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <a-input v-model:value="app.config.title" />
        </a-form-item>
        <a-form-item
          label="系统语言"
          name="lang"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <a-input v-model:value="app.config.lang" />
        </a-form-item>
        <a-form-item
          label="时区"
          name="timezone"
          :rules="[{ required: true, message: '请填写' }]"
        >
          <a-input v-model:value="app.config.timezone" />
        </a-form-item>
  
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-space>
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button @click="reset">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>