<script setup>
import { ref } from 'vue'
import { addRole, upadteRole } from '@/api/role'
import { deepClone } from '@/utils'
const emit = defineEmits(['pushDate'])

const dialogVisible = ref(false)
const dialogStatus = ref('create')
const textMap = {
	update: '编辑',
	create: '添加'
}
const tempSource = ref()
class Temp {
	_id = undefined
	title = ''
	desc = ''
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
// 编辑
const handleUpdate = (row) => {
	dialogStatus.value = 'update'
	// 静态更新
	tempRef.value = row
	// 原数据
	tempSource.value = Object.assign({}, deepClone(row))
	dialogVisible.value = true
}
// 添加
const createData = () => {
	addRole(tempRef.value).then(res => {
		dialogVisible.value = false
		emit('pushDate', res.data)
	})
}
// 更新
const updateData = () => {
	upadteRole(tempRef.value).then(() => {
		dialogVisible.value = false
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
	handleUpdate
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
        label="角色"
        name="title"
        :rules="[{ required: true, message: '请填写!' }]"
      >
        <a-input v-model:value="tempRef.title" />
      </a-form-item>

      <a-form-item
        label="描述"
        name="desc"
      >
        <a-textarea v-model:value="tempRef.desc" show-count :maxlength="50" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>