<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-25 11:49:15
 * @LastEditTime: 2023-08-27 02:55:52
 * @LastEditors: Amber
-->
<script setup>
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { adminLogin } from '@/api/logs'
import Pagination from '@/components/Pagination/index.vue'
import { onMounted, ref, unref, computed } from 'vue'
import { useUnix } from '@/hooks/useUnix'
import { logLevels } from '@/assets/js/logs'
const { rangePickerDate, arrDateToDate } = useUnix()

const route = useRoute()

const auth = route.meta.auth

const columns = ref([
	{
		title: '等级',
		dataIndex: 'level',
		key: 'level',
	}, {
		title: '内容',
		dataIndex: 'message',
		key: 'message',
	}, {
		title: '用户',
		dataIndex: 'user',
		key: 'user',
	}, {
		title: '设备',
		dataIndex: 'os',
		key: 'os',
	}, {
		title: 'IP',
		dataIndex: 'ip',
		key: 'ip',
	}, {
		title: '记录时间',
		dataIndex: 'timestamp',
		key: 'timestamp',
	}
])

const dataSource= ref([])
const total = ref(0)
const loading = ref(false)

const params = ref({
	limit: 10,
	page: 1,
	level: '',
	'meta.user': '',
	timestamp: [],
})
const op = {
	level: 'LIKE',
	user: 'LIKE',
	'meta.user': 'LIKE',
	timestamp: 'BETWEEN_DATE'
}
const disabledDate = current => {
	// 今天之后的日期不可选
	return current && current > dayjs().endOf('day')
}

// table选择事件
const selectedRowKeys = ref([])
const rowSelection = computed(() => {
	return {
		selectedRowKeys: unref(selectedRowKeys),
		onChange: changableRowKeys => {
			selectedRowKeys.value = changableRowKeys
		}
	}
})
const fetchDate = () => {
	arrDateToDate(params, 'timestamp')
	adminLogin({params: params.value, op}, {loading: loading}).then(result => {
		dataSource.value = result.data.list
		total.value = result.data.total
	})
}

onMounted(() => {
	fetchDate()
})
</script>
<template>
  <div class="filter-container">
      <a-form layout="inline">
        <a-form-item label="等级">
          <a-select v-model:value="params.level" placeholder="请选择" showArrow allowClear style="width: 160px;">
            <a-select-option v-for="item in logLevels.levels"
              :key="item"
              :label="item"
              :value="item"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="用户">
          <a-input v-model:value="params['meta.user']" allow-clear />
        </a-form-item>
        <a-form-item label="记录时间">
          <a-range-picker
            v-model:value="rangePickerDate"
            :disabled-date="disabledDate"
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
            }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="fetchDate">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-main">
      <a-table :columns="columns" :data-source="dataSource" :rowKey="record => record._id" :loading="loading" :pagination="false" :row-selection="auth.includes('删除') ? rowSelection : null">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <a-tag :color="logLevels.colors[record.level]" @click="params.level = record.level;fetchDate()" class="cursor-pointer">{{ record.level }}</a-tag>
          </template>
          <template v-if="column.key === 'username'">
            {{ record.username }}
          </template>
          <template v-if="column.key === 'os'">
            {{ record.os }}<br>
            {{ record.browser }}
          </template>
          <template v-if="column.key === 'timestamp'">
            {{ $parseTime(new Date(record.timestamp)) }}
          </template>
        </template>
      </a-table>
      <pagination :total="total" v-model:current="params.page" :page-size="params.limit" @pagination="fetchDate" :showDel="auth.includes('删除')" />
    </div>
</template>