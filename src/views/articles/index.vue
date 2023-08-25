<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-17 02:31:28
 * @LastEditTime: 2023-08-25 18:43:28
 * @LastEditors: Amber
-->
<script setup>
import dayjs from 'dayjs'
import { getList, delArticle, upadteArticle } from '@/api/article'
import { deepClone } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'
import { onMounted, ref, unref, computed, reactive, inject } from 'vue'
import { useUnix } from '@/hooks/useUnix'

const { rangePickerDate, arrDateToUnix } = useUnix()

const $msg = inject('message')

const columns = ref([
	{
		title: '标题',
		dataIndex: 'title',
		key: 'title',
	}, {
		title: '作者',
		dataIndex: 'username',
		key: 'username',
	}, {
		title: '简介',
		dataIndex: 'description',
		key: 'description',
		ellipsis: true,
	}, {
		title: '内容',
		dataIndex: 'body',
		key: 'body',
		ellipsis: true,
	}, {
		title: '粉丝',
		dataIndex: 'fans',
		key: 'fans',
	}, {
		title: '标签',
		dataIndex: 'tagList',
		key: 'tagList',
	}, {
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: 'center',
		width: 200
	}
])
const dataSource= ref([])
const total = ref(0)
const loading = ref(false)
const editableData = reactive({})

const params = ref({
	limit: 10,
	page: 1,
	title: '',
	description: '',
	body: '',
	fans: [],
	createdAt: []
})
const op = {
	title: '$eq',
	description: 'LIKE',
	body: 'LIKE',
	fans: 'BETWEEN',
	createdAt: 'BETWEEN'
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
	arrDateToUnix(params, 'createdAt')
	getList({params: params.value, op}, {loading: loading}).then(result => {
		dataSource.value = result.data.list
		total.value = result.data.total
	})
}
const handleUpdate = (_id) => {
	editableData[_id] = deepClone(dataSource.value.filter(item => item._id == _id)[0])
}
const update = (_id) => {
	const hide = $msg.loading('更新中...', 0)
	upadteArticle(editableData[_id], {msgLoading: hide}).then(() => {
		Object.assign(dataSource.value.filter(item => _id === item._id)[0], editableData[_id])
		delete editableData[_id]
	})
}
const handleCancel = (_id) => {
	delete editableData[_id]
}
const handleDels = () => {
	del(selectedRowKeys.value)
}
const del = async (ids) => {
	await delArticle(ids)
	// 静态删除
	// dataSource.value = dataSource.value.filter(item => !ids.includes(item._id))
	fetchDate()
}

onMounted(() => {
	fetchDate()
})
</script>
<template>
  <div class="filter-container">
      <a-form layout="inline">
        <a-form-item label="标题">
          <a-input v-model:value="params.title" allow-clear />
        </a-form-item>
        <a-form-item label="简介">
          <a-input v-model:value="params.description" allow-clear />
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model:value="params.body" allow-clear />
        </a-form-item>
        <a-form-item label="粉丝">
          <a-input-group compact class="w-52">
            <a-input-number v-model:value="params.fans[0]" style="width: 50%" :min="0" placeholder="最小" />
            <a-input-number v-model:value="params.fans[1]" style="width: 50%" :min="0" placeholder="最大" />
          </a-input-group>
        </a-form-item>
        <a-form-item label="创建时间">
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
      <a-table :columns="columns" :data-source="dataSource" :rowKey="record => record._id" :loading="loading" :pagination="false" :row-selection="rowSelection">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <a-input
              v-if="editableData[record._id]"
              v-model:value="editableData[record._id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>{{ record.title }}</template>
          </template>
          <template v-if="column.key === 'username'">
            <a-avatar :src="$formatImgPath(record.avatar)" />
            {{ record.username }}
          </template>
          <template v-if="column.key === 'description'">
            <a-input
              v-if="editableData[record._id]"
              v-model:value="editableData[record._id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>{{ record.description }}</template>
          </template>
          <template v-if="column.key === 'body'">
            <a-input
              v-if="editableData[record._id]"
              v-model:value="editableData[record._id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>{{ record.body }}</template>
          </template>
          <template v-if="column.key === 'fans'">
            <a-input
              v-if="editableData[record._id]"
              v-model:value="editableData[record._id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>{{ record.fans }}</template>
          </template>
          <template v-if="column.key === 'tagList'">
            <a-select v-if="editableData[record._id]" v-model:value="editableData[record._id][column.dataIndex]" placeholder="请选择" mode="tags" showArrow>
              <a-select-option v-for="item in record.tagList"
                :key="item"
                :label="item"
                :value="item"
              />
            </a-select>
            <template v-else>
              <!-- <a-tag color="blue" v-for="item in record.tagList" :key="item+new Date().getTime()">{{ item }}</a-tag> -->
            </template>
          </template>
          <template v-if="column.key === 'createdAt'">
            {{ $parseTime(record.createdAt) }}
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space warp>
              <a-button v-if="!editableData[record._id]" type="primary" size="small" @click="handleUpdate(record._id)">编辑</a-button>
              <template v-else>
                <a-button class="color before:bg-green-500" size="small" @click="update(record._id)">保存</a-button>
                <a-button size="small" @click="handleCancel(record._id)">取消</a-button>
              </template>
              <a-popconfirm
                :title="'确定删除 ' + record.title + '?'"
                @confirm="del([record._id])"
              >
                <a-button danger size="small">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
      <pagination :total="total" v-model:current="params.page" :page-size="params.limit" :multipleSelection="selectedRowKeys" @pagination="fetchDate" @on-dels="handleDels" />
    </div>
</template>