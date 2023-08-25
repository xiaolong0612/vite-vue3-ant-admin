<script setup>
import { getList, delAdmin } from '@/api/admin'
import { onMounted, ref } from 'vue'
import UserAdd from './components/UserAdd.vue'

const userRef = ref(null)

const sort = ref('')
const params = ref({
	page: 1,
	limit: 10,
	username: '',
	createdAt: []
})
const op = {
	username: 'LIKE',
	createdAt: 'BETWEEN'
}
const columns = ref([
	{
		title: '用户名',
		dataIndex: 'username',
		key: 'username',
	}, {
		title: '头像',
		dataIndex: 'avatar',
		key: 'avatar',
	}, {
		title: '权限',
		dataIndex: 'role',
		key: 'role',
	}, {
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: 'center'
	}
])
const list= ref([])
const loading = ref(false)
const total = ref(5)

// 获取数据
const fetchData = () => {
	getList({ sort: sort.value, params: params.value, op: op }, {loading: loading}).then(res => {
		list.value = res.data.list
		total.value = res.data.total
	})
}
// 创建
const handleCreate = () => {
	userRef.value.handleCreate()
}
// 编辑
const handleUpdate = (row) => {
	userRef.value.handleUpdate(row)
}
// 单个删除
const handleDel = (row) => {
	delData([row._id])
}
// 删除
const delData = async (ids) => {
	await delAdmin(ids)
	fetchData()
}

// // 多选删除
// handleDels() {
// 	const ids = []
// 	this.multipleSelection.map(item => {
// 		ids.push(item._id)
// 	})
// 	this.delDate(ids)
// }
onMounted(() => {
	fetchData()
})

</script>
<template>
  <div class="app-container">
    <div class="filter-container">
      <a-form layout="inline">
        <a-form-item>
          <a-button type="primary" @click="handleCreate">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-main">
      <a-table :columns="columns" :data-source="list" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :src="$formatImgPath(record.avatar)" />
          </template>
          <template v-if="column.key === 'role'">
            <a-tag color="blue">{{ record.role }}</a-tag>
          </template>
          <template v-if="column.key === 'createdAt'">
            {{ $parseTime(record.createdAt) }}
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space warp>
              <a-button type="primary" size="small" @click="handleUpdate(record)">编辑</a-button>
              <a-button v-if="!record.readOnly" danger size="small" @click="handleDel(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <UserAdd ref="userRef" @fetch-data="fetchData"/>
</template>
//       sort: '',
//       params: {
//         page: 1,
//         limit: 10,
//         username: '',
//         createdAt: []
//       },
//       op: {
//         username: 'LIKE',
//         createdAt: 'BETWEEN'
//       },
