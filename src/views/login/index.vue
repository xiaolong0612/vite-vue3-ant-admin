<template>
  <div class="wrap">

    <div class="login-container flex flex-col justify-center md:w-1/3 max-sm:w-9/12">
      <div class="title-container mb-5">
        <h3 class="text-5xl">登陆</h3>
      </div>
  
      <a-form
        :model="loginForm"
        :rules="loginRules"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="handleLogin"
      >
        <a-form-item
          label=""
          name="username"
          has-feedback
        >
          <a-input v-model:value="loginForm.username" />
        </a-form-item>
  
        <a-form-item
          label=""
          name="password"
          has-feedback
        >
          <a-input-password v-model:value="loginForm.password" @change="remember"/>
        </a-form-item>
  
        <a-form-item name="remember">
          <a-checkbox v-model:checked="loginForm.remember" @change="remember">
            <span class="dark:text-slate-600">Remember me</span>
          </a-checkbox>
        </a-form-item>
  
        <a-form-item>
          <a-button class="cut blue w-48" html-type="submit" @keyup="checkCapslock" @blur="capsTooltip = false"
          @keyup.enter="handleLogin" :loading="loading">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils'
import device from 'current-device'
import { Base64 } from 'js-base64'

const user = useUserStore()
const router = useRouter()


const loginForm = reactive({
	username: 'admin',
	password: '',
	remember: false
})
if(localCache.getCache('REMEMBER')){
	let temp = Base64.decode(localCache.getCache('REMEMBER')).split('^_^')
	if(temp[1] == device.os){
		loginForm.password = Base64.decode(temp[0])
	} else {
		loginForm.password = temp[0]
	}
	loginForm.remember = true
}
const validateUsername = (_rule, value) => {
	if (value.length < 5) {
		return Promise.reject('请输入正确的账号')
	} else {
		return Promise.resolve()
	}
}
const validatePassword = async (_rule, value) => {
	if (value.length < 6) {
		return Promise.reject('密码不能少于6位')
	} else {
		return Promise.resolve()
	}
}

const loginRules = reactive({
	username: [{ required: true, trigger: 'blur', validator: validateUsername }],
	password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

let capsTooltip = ref(false)
let loading = ref(false)

const handleLogin = () => {
	user.login(loginForm, loading).then(() => {
		router.push('/')
	})
}
const checkCapslock = (e) => {
	const { key } = e
	capsTooltip.value = key && key.length === 1 && (key >= 'A' && key <= 'Z')
}
const remember = () => {
	if(loginForm.remember) {
		localCache.setCache('REMEMBER', Base64.encode(Base64.encode(loginForm.password) +'^_^'+ device.os))
	} else {
		localCache.removeCache('REMEMBER')
	}
}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 100%;
  width: 100%;
  background: url('@/assets/login-bg.png') center no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-container{
    margin-left: 15vw;
    height: 100vh;
  }
}
</style>
