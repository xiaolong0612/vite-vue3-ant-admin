<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 02:14:14
 * @LastEditTime: 2023-08-26 00:25:20
 * @LastEditors: Amber
-->
<script setup>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ref, inject } from 'vue'
import { useAppStore } from '@/stores/app'
import { upadteConfig } from '@/api/config'

dayjs.extend(utc)
dayjs.extend(timezone)

const $msg = inject('message')
const app = useAppStore()

const time = ref('')
setInterval(() => {
	time.value = dayjs(new Date()).tz(app.config.timezone).format('YYYY/MM/DD HH:mm:ss')
}, 1000)

const onChange = (val) => {
	app.config.lang = app.timezone.filter(item => item.value == val)[0].lang
	const hide = $msg.loading('更新中...', 0)
	upadteConfig(app.config, {msgLoading: hide})
	app.changeLang(app.config.lang)
}
</script>
<template>
  <div>
    <span class="dark:text-gray-500">系统时区：</span>
    <a-select
      v-model:value="app.config.timezone"
      style="width: 160px;"
      :options="app.timezone"
      @change="onChange"
    >
    </a-select>
    <a-tooltip>
      <template #title>根据时区语言，自动修改；可在设置中单独配置后台语言</template>
      <span class="time text-xl ml-2"><a-spin v-if="time == ''" />{{ time }}</span>
    </a-tooltip>
  </div>
</template>
<style scoped lang="scss">
$color1: #186cb8;
$color2: #2a9a9f;
$color3: #f1b211;
$color4: #e83611;
$color5: #f9002f;
.time {
  font-family: "Exo", sans-serif;
  font-weight: 900;
  width: min-content;
  text-transform: uppercase;
  background: linear-gradient(
    219deg,
    $color1 19%,
    transparent 19%,
    transparent 20%,
    $color2 20%,
    $color2 39%,
    transparent 39%,
    transparent 40%,
    $color3 40%,
    $color3 59%,
    transparent 59%,
    transparent 60%,
    $color4 60%,
    $color4 79%,
    transparent 79%,
    transparent 80%,
    $color5 80%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>