<script setup>
import { ref, inject } from 'vue'
import { deepClone } from '@/utils'
import { addRouter, upadteRouter } from '@/api/router'
const emit = defineEmits(['fetchData'])

const $msg = inject('message')

const dialogVisible = ref(false)
const dialogStatus = ref('create')
const textMap = {
	update: '编辑',
	create: '添加'
}

defineProps({
	routerSource: {
		type: Array,
		default: () => []
	}
})

const authList = ['添加', '编辑', '删除', '上传文件']
const parent_id = ref([])
const tempSource = ref({})
class Temp {
	_id = undefined
	parent_id = ''
	hidden = false
	path = 'index'
	redirect = ''
	component = 'articles/index'
	name = '文章管理'
	meta = {
		title: '文章列表',
		icon: 'laptop-outlined',
		auth: ['添加', '编辑', '删除', '上传文件'],
		sort: 0
	}
}

// 初始表单数据
const tempRef = ref(new Temp())
// 重置表单数据
const resetTemp = () => {
	tempRef.value = new Temp()
}
// 创建
const handleCreate = () => {
	resetTemp()
	dialogStatus.value = 'create'
	dialogVisible.value = true
}
// add
const createData = async () => {
	tempRef.value.parent_id = parent_id.value[parent_id.value.length - 1]
	const params = Object.assign(tempRef.value, {component: tempRef.value.componentStr})
	delete params.componentStr
	delete params.childred
	await addRouter(params)
	dialogVisible.value = false
	emit('fetchData')
}
// 编辑
const handleUpdate = (row) => {
	dialogStatus.value = 'update'
	// 静态更新
	tempRef.value = row
	// 原数据
	tempSource.value = Object.assign({}, deepClone(row))
	parent_id.value = [tempRef.value.parent_id]
	dialogVisible.value = true
}
// 更新
const updateData = () => {
	const hide = $msg.loading('更新中...', 0)
	const params = Object.assign(tempRef.value, {component: tempRef.value.componentStr})
	delete params.componentStr
	delete params.childred
	upadteRouter(params, {msgLoading: hide}).then(() => {
		dialogVisible.value = false
		emit('fetchData')
	})
}
// 更新单个字段
const updateField = (params) => {
	return new Promise((resolve) => {
		upadteRouter(params).then(() => {
			resolve()
		})
	})
}
const onSubmit = () => {
	dialogStatus.value === 'create' ? createData() : updateData()
}
const onCancel = () => {
	Object.keys(tempRef.value).map(key => {
		tempRef.value[key] = tempSource.value[key]
	})
}

defineExpose({
	handleCreate,
	handleUpdate,
	updateField
})
</script>
<template>
  <a-modal :title="textMap[dialogStatus]" v-model:open="dialogVisible" @ok="onSubmit" @cancel="onCancel">
    <a-form
      :model="tempRef"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
    >
      <a-form-item
        label="是否禁用"
        name="hidden"
      >
        <a-radio-group v-model:value="tempRef.hidden">
          <a-radio :value="false">启用</a-radio>
          <a-radio :value="true">禁用</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="父级菜单"
        name="parent_id"
      >
      <a-cascader
        v-model:value="parent_id"
        :options="routerSource"
        :fieldNames="{ label: 'title', value: '_id' }"
        placeholder="默认一级菜单"
        change-on-select
      />
      </a-form-item>

      <a-form-item
        label="访问路径"
        name="path"
        :rules="[{ required: true, message: '请填写!' }]"
      >
        <a-input v-model:value="tempRef.path" />
      </a-form-item>
      <a-form-item
        label="重定向"
        name="redirect"
      >
        <a-input v-model:value="tempRef.redirect" />
      </a-form-item>
      <a-form-item
        label="模版"
        name="componentStr"
        :rules="[{ required: true, message: '请填写!' }]"
      >
        <a-input v-model:value="tempRef.componentStr" />
      </a-form-item>
      <a-form-item
        label="命名(英文)"
        name="name"
        :rules="[{ required: true, message: '请填写!' }]"
      >
        <a-input v-model:value="tempRef.name" />
      </a-form-item>

      <a-form-item
        label="标题"
        name="meta.title"
      >
        <a-input v-model:value="tempRef.meta.title" />
      </a-form-item>

      <a-form-item
        label="图标"
        name="meta.icon"
      >
        <a-input v-model:value="tempRef.meta.icon">
          <template #addonBefore>
            <icon :icon="tempRef.meta.icon" />
          </template>
        </a-input>
      </a-form-item>
      
      <a-form-item
        label="排序"
        name="meta.sort"
      >
        <a-input v-model:value="tempRef.meta.sort" />
      </a-form-item>
      <a-form-item
        label="操作权限"
        name="meta.auth"
      >
        <a-select v-model:value="tempRef.meta.auth" placeholder="请选择" mode="tags" showArrow>
          <a-select-option v-for="item in authList"
            :key="item"
            :label="item"
            :value="item"
          />
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>