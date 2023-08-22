<script setup>
import { ref } from 'vue'
import { randomPwd, checkPwdLevel } from '@/utils'
import { upadtePwd } from '@/api/admin'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
// 验证密码
const validatePwd = async (_rule, value) => {
	if(value == '') {
		return Promise.reject('密码不能为空!')
	} else if (value && [0,1].includes(checkPwdLevel(value))) {
		return Promise.reject('密码必需包含大小写字母、数字、符号任意两者组合!')
	} else {
		return Promise.resolve()
	}
}
const validateCheckPwd = async (_rule, value) => {
	if(value == ''){
		return Promise.reject('密码不能为空!')
	} else if (value != tempRef.value.checkPwd) {
		return Promise.reject('两次密码不一致！')
	} else {
		return Promise.resolve()
	}
}

const dialogVisible = ref(false)
const tempSource = ref()
const spin = ref(false)
const formRef = ref(null)
class Temp {
	oldPassword = ''
	password = ''
	checkPwd = ''
}
const rules = ref({
	oldPassword: [{
		required: true,
		trigger: 'blur',

	}],
	password: [{
		required: true,
		validator: validatePwd,
		trigger: 'blur',
	}],
	checkPwd: [{
		required: true,
		validator: validateCheckPwd,
		trigger: 'blur',
	}],
})

// 初始表单数据
const tempRef = ref(new Temp())
// 重置表单数据
const resetTemp = () => {
	tempRef.value = new Temp()
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
const handleUpdate = () => {
	resetTemp()
	dialogVisible.value = true
}

// 更新
const updateData = () => {
	formRef.value.validate().then(() => {
		upadtePwd({_id: user._id, ...tempRef.value}).then(() => {
    	// dialogVisible.value = false
		})
	})
}

const onSubmit = () => {
	updateData()
}
const onCancel = () => {
	Object.keys(tempRef.value).map(key => {
		tempRef.value[key] = tempSource.value[key]
	})
}
defineExpose({
	handleUpdate
})
</script>

<template>
  <a-modal title="修改密码" v-model:open="dialogVisible" @ok="onSubmit" @cancel="onCancel">
    <a-form
      :model="tempRef"
      :rules="rules"
      ref="formRef"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item
        label="旧密码"
        name="oldPassword"
      >
        <a-input v-model:value="tempRef.oldPassword" />
      </a-form-item>
      <a-form-item
        label="新密码"
        name="password"
      >
        <a-input v-model:value="tempRef.password" onpaste="return false" placeholder="密码必需包含大小写字母、数字、符号任意两者组合!">
          <template #suffix>
            <a-tooltip title="刷新">
              <redo-outlined :spin="spin" style="color: rgba(0, 0, 0, 0.45)" @click="getRandomPwd" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="checkPwd"
      >
        <a-input v-model:value="tempRef.checkPwd" onpaste="return false" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>