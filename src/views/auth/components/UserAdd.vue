<script setup>
import { ref, inject, onMounted } from 'vue'
import { deepClone, randomPwd, checkPwdLevel } from '@/utils'
import { getList as getRoleList } from '@/api/role'
import { addAdmin, upadteAdmin } from '@/api/admin'
const emit = defineEmits(['fetchData'])

const $msg = inject('message')

// 验证密码
const validatePwd = async (_rule, value) => {
	// 更新密码为空时，不验证
	if(dialogStatus.value == 'update' && value == '') return Promise.resolve()
	if (value && [0,1].includes(checkPwdLevel(value))) {
		return Promise.reject('密码必需包含大小写字母、数字、符号任意两者组合!')
	} else {
		return Promise.resolve()
	}
}

const dialogVisible = ref(false)
const dialogStatus = ref('create')
const textMap = {
	update: '编辑',
	create: '添加'
}
const tempSource = ref()
const spin = ref(false)
class Temp {
	_id = undefined
	username = ''
	password = ''
	avatar = ''
	role = ''
}
const rules = ref({
	username: [{
		required: true,
		message: '最少5位',
		trigger: 'blur',
	}],
	password: [{
		required: true,
		validator: validatePwd,
		trigger: 'blur',
	}],
	role: [{
		required: true,
		message: '请选择!',
		trigger: 'blur',
	}]
})

// 权限
const roleList = ref([])

// 头像上传
const fileList = ref([])
const loading = ref(false)
// 初始表单数据
const tempRef = ref(new Temp())
// 重置表单数据
const resetTemp = () => {
	tempRef.value = new Temp()
}
// 头像限制
const beforeUpload = (file) => {
	const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
	const isJpgOrPng = imgType.includes(file.type)
	if (!isJpgOrPng) {
		$msg.error('您只能上传jpeg、jpg、png、gif文件!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		$msg.error('图像必须小于2MB!')
	}
	return isJpgOrPng && isLt2M
}
// 文件上传回掉
const handleChange = (info) => {
	if (info.file.status === 'uploading') {
		loading.value = true
		return
	}
	if (info.file.status === 'done') {
		tempRef.value.avatar = info.file.response.data
		loading.value = false
	}
	if (info.file.status === 'error') {
		loading.value = false
		$msg.error('upload error')
	}
}
// 刷新密码
const getRandomPwd = () => {
	spin.value = true
	tempRef.value.password = randomPwd(6)
	setTimeout(() => {
		spin.value = false
	},1000)
}
// 创建弹窗
const handleCreate = () => {
	resetTemp()
	tempRef.value.password = randomPwd(6)
	rules.value.password[0].required = true
	dialogStatus.value = 'create'
	dialogVisible.value = true
}
// 创建
const createData = async () => {
	await addAdmin(tempRef.value)
	emit('fetchData')
	dialogVisible.value = false
}
// 编辑
const handleUpdate = (row) => {
	resetTemp()
	// 静态更新
	tempRef.value = row
	// 原数据
	tempSource.value = Object.assign({}, deepClone(row))
	rules.value.password[0].required = false
	dialogStatus.value = 'update'
	dialogVisible.value = true
}

// 更新
const updateData = () => {
	upadteAdmin(tempRef.value).then(() => {
		dialogVisible.value = false
	})
}

// 获取角色列表
const fetchRoleList = () => {
	getRoleList({msgShow: false}).then(result => {
		roleList.value = result.data.list
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
onMounted(() => {
	fetchRoleList()
})
</script>

<template>
  <a-modal :title="textMap[dialogStatus] + '管理员'" v-model:open="dialogVisible" @ok="onSubmit" @cancel="onCancel">
    <a-form
      :model="tempRef"
      :rules="rules"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
    >
      <a-form-item
        label="用户名"
        name="username"
      >
        <a-input v-model:value="tempRef.username" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
      >
        <a-input v-model:value="tempRef.password" placeholder="密码必需包含大小写字母、数字、符号任意两者组合!">
          <template #suffix>
            <a-tooltip title="刷新">
              <redo-outlined :spin="spin" style="color: rgba(0, 0, 0, 0.45)" @click="getRandomPwd" />
            </a-tooltip>
          </template>
        </a-input>
        <p></p>
      </a-form-item>
      <a-form-item
        label="头像"
        name="avatar"
      >
        <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="/upload/avatar"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="tempRef.avatar" class="rounded" :src="$formatImgPath(tempRef.avatar)" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        </a-form-item>
        <a-form-item
          label="角色"
          name="role"
        >
          <a-select v-model:value="tempRef.role">
            <a-select-option v-for="item in roleList" :key="item._id" :value="item.title">{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
  </a-modal>
</template>