<!--
 * @Description: 错误日志
 * @Author: Amber
 * @Date: 2023-03-15 10:42:21
 * @LastEditTime: 2023-08-26 14:29:12
 * @LastEditors: Amber
-->
<script setup>
import { useErrorLogStore } from '@/stores/errorLog'
import { computed, ref } from 'vue'
import { checkNeed } from '@/plugins/errorLog'

const columns = [
	{
		title: 'Message',
		dataIndex: 'message',
		key: 'message',
	}, {
		title: 'Stack',
		dataIndex: 'stack',
		key: 'stack',
	}
]

const errorLogs = computed(() => {
	return useErrorLogStore().logs
})
const dialogTableVisible = ref(false)

const toggle = () => {
	dialogTableVisible.value = !dialogTableVisible.value
}
const clearAll = () => {
	useErrorLogStore().clearErrorLog()
}
</script>
<template>
  <div v-if="errorLogs.length > 0 && checkNeed()">
    <a-badge :dot="true">
      <BugOutlined @click="toggle" class="text-xl text-black-500 dark:text-gray-500" />
    </a-badge>

    <a-modal v-model:open="dialogTableVisible" :footer="null" width="500">
      <template #title>
          <span class="align-middle">Error Log!</span>
          <a-button class="ml-4" danger @click="clearAll">
            <template #icon>
              <DeleteOutlined />
            </template>
            Clear All
          </a-button>
      </template>
      <a-table :dataSource="errorLogs" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'message'">
            {{ record.err.message }}
            <div>
              <span class="message-title">Msg:</span>
              <a-tag color="red">
                {{ record.err.message }}
              </a-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <a-tag color="orange">
                {{ record.instance.$refs }} error in {{ record.info }}
              </a-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <a-tag color="green">
                {{ record.url }}
              </a-tag>
            </div>
          </template>
          <template v-else-if="column.key === 'stack'">
            {{ record.err.stack }}
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
