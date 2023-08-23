<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-23 20:17:35
 * @LastEditTime: 2023-08-23 22:52:52
 * @LastEditors: Amber
-->
<script setup>
import { message } from '@/api/i18n'

const getMsg = (type) => {
	message(type)
}
</script>
<template>
  <div class="content-main">
    <a-typography-paragraph>根据时区语言，自动修改；可在设置中单独配置后台语言</a-typography-paragraph>
    <div class="flex">
      <a-card title="服务端 response i18n" style="width: 300px" class="mr-5">
        <a-space wrap>
          <a-button type="primary" @click="getMsg('zh_CN')">中文</a-button>
          <a-button type="primary" @click="getMsg('en_US')">English</a-button>
        </a-space>
      </a-card>
      <a-card title="本地 i18n">
        <a-space wrap>
          <a-button type="primary">{{ $t('chinese') }}</a-button>
          <a-button type="primary">{{ $t('english') }}</a-button>
        </a-space>
      </a-card>
    </div>
  </div>
</template>