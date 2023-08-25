<script setup>
import { ref, inject, reactive } from 'vue'
import { deepClone } from '@/utils'
import { addRouter, upadteRouter } from '@/api/router'
import { usePermissionStore } from '@/stores/permission'

const permission = usePermissionStore()
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
// 获取路由完整的父级ids
const getParentIdArr = (id, res = []) => {
	if(!id) return res
	res.unshift(id)
	const hasParent = permission.routesSourceObj[id].parent_id
	if(hasParent) return getParentIdArr(hasParent, res)
	return res
}

const authList = ['添加', '编辑', '删除', '上传文件']
const parent_id = ref([])
const tempSource = ref({})
class Temp {
	_id = undefined
	parent_id = ''
	menuType = 1
	openType = 0
	component = ''
	path = ''
	title = ''
	icon = 'sliders-outlined'
	auth = []
	sort = 0
	hidden = 0
}

const disabled = reactive({
	openType: false,
	component: false,
	auth: false,
	path: false
})
const changeMenuType = () => {
	if(tempRef.value.menuType){
		disabled.openType = false
		disabled.auth = false
	}else{
		disabled.openType = true
		disabled.auth = true
	}
}
const changeOpenType = () => {
	if(tempRef.value.openType == 2){
		disabled.auth = true
		disabled.path = true
	}else{
		disabled.auth = false
		disabled.path = false
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
const handleItemAdd = (row) => {
	resetTemp()
	dialogStatus.value = 'create'
	parent_id.value = getParentIdArr(row?._id)
	dialogVisible.value = true
}
// add
const createData = async () => {
	tempRef.value.parent_id = parent_id.value.length != 0 ? parent_id.value[parent_id.value.length - 1] : ''
	await addRouter(tempRef.value)
	emit('fetchData')
	dialogVisible.value = false
}
// 编辑
const handleUpdate = (row) => {
	dialogStatus.value = 'update'
	// 静态更新
	tempRef.value = row
	// 原数据
	tempSource.value = Object.assign({}, deepClone(row))
	parent_id.value = getParentIdArr(tempRef.value?.parent_id)
	dialogVisible.value = true
}
// 更新
const updateData = () => {
	const hide = $msg.loading('更新中...', 0)
	tempRef.value.parent_id = parent_id.value.length != 0 ? parent_id.value[parent_id.value.length - 1] : ''
	tempSource.value = deepClone(tempRef.value)
	delete tempSource.value.children
	upadteRouter(tempRef.value, {msgLoading: hide}).then(() => {
		emit('fetchData')
		dialogVisible.value = false
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
	handleItemAdd,
	handleUpdate,
	updateField
})
</script>
<template>
  <a-modal :title="textMap[dialogStatus]" :width="766" v-model:open="dialogVisible" @ok="onSubmit" @cancel="onCancel">
    <a-form
      :model="tempRef"
      name="basic"
      :label-col="{ span: 8 }"
      autocomplete="off"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="上级菜单"
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
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="菜单类型"
            name="menuType"
          >
            <a-radio-group v-model:value="tempRef.menuType" @change="changeMenuType">
              <a-radio :value="0">目录</a-radio>
              <a-radio :value="1">菜单</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="菜单名称"
            name="title"
            :rules="[{ required: true, message: '请填写!' }]"
          >
            <a-input v-model:value="tempRef.title" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="打开方式"
            name="openType"
          >
            <a-radio-group v-model:value="tempRef.openType" @change="changeOpenType" :disabled="disabled.openType">
              <a-radio :value="0">组件</a-radio>
              <a-radio :value="1">内链</a-radio>
              <a-radio :value="2">外链</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider class="mt-0" />
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="菜单图标"
            name="icon"
          >
            <a-input v-model:value="tempRef.icon">
              <template #addonBefore>
                <icon :type="tempRef.icon" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="操作权限"
            name="auth"
          >
            <a-select v-model:value="tempRef.auth" placeholder="请选择" mode="tags" showArrow :disabled="disabled.auth">
              <a-select-option v-for="item in authList"
                :key="item"
                :label="item"
                :value="item"
              />
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :label="['路由地址', '内链', '外链'][tempRef.openType]"
            name="path"
            :rules="[{ required: true, message: '请填写!' }]"
          >
            <a-input v-model:value="tempRef.path" :disabled="disabled.path" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="排序"
            name="sort"
          >
            <a-input v-model:value="tempRef.sort" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            v-if="tempRef.openType == 0"
            label="组件路径"
            name="component"
          >
            <a-input v-model:value="tempRef.component" :disabled="disabled.component" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="是否隐藏"
            name="hidden"
          >
            <a-switch v-model:checked="tempRef.hidden" checked-children="是" un-checked-children="否" :checkedValue="1" :unCheckedValue="0" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>