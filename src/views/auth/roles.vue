<script setup>
import { onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import RoleEdit from './components/RoleEdit.vue'
import Authorize from './components/Authorize.vue'
import { getList, delRole, upadteRole } from '@/api/role'

const $msg = inject('message')
const route = useRoute()

const auth = route.meta.auth
console.log(auth)
const editRef = ref(null)
const authorizeRef = ref(null)

const list = ref([])
const loading = ref(false)

const columns = ref([
	{
		title: '角色',
		dataIndex: 'title',
		key: 'title'
	}, {
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
	}, {
		title: '状态',
		dataIndex: 'status',
		key: 'status',
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: 'center'
	}
])
// 获取数据
const fetchData = () => {
	getList({loading}).then(res => {
		list.value = res.data.list
	})
}
// 创建
const handleCreate = () => {
	editRef.value.handleCreate()
}
// 静态添加数据
const pushDate = (data) => {
	list.value.push(data)
}
// 编辑
const handleUpdate = (row) => {
	editRef.value.handleUpdate(row)
}
// 授权
const handleAuth = (row) => {
	authorizeRef.value.handleAuth(row)
}
// 更新状态
const updateStatus = (row) => {
	const hide = $msg.loading('更新中...', 0)
	const status = row.status == 1 ? 0 : 1
	upadteRole({_id: row._id, status}).then(() => {
		row.status = status
		hide()
	})
}
// 单个删除
const handleDel = (row) => {
	delDate([row._id])
}
// 删除
const delDate = (ids) => {
	if(ids.length == 0 ) return
	delRole(ids).then(() => {
		// 静态删除
		ids.map(id => {
			list.value = list.value.filter(item => item._id !== id)
		})
	})
}
onMounted(() => {
	fetchData()
})
</script>

<template>
  <div class="app-container">
    <div class="filter-container" v-if="auth.includes('添加')">
      <a-form layout="inline">
        <a-form-item>
          <a-button type="primary" @click="handleCreate">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-main">
      <a-table :columns="columns" :data-source="list" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            {{ record.title }}
            <p class="text-current text-xs">{{ record.desc }}</p>
          </template>
          <template v-if="column.key === 'createdAt'">
            {{ $parseTime(record.createdAt) }}
          </template>
          <template v-if="column.key === 'status'">
            <a-tag v-if="record.status" color="green" class="cursor-pointer" @click="record.title != '超级管理员' && updateStatus(record)">启用</a-tag>
            <a-tag v-else color="red" class="cursor-pointer" @click="updateStatus(record)">禁用</a-tag>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space warp>
              <a-button v-if="!record.readOnly && auth.includes('授权')" class="color before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500" size="small" @click="handleAuth(record)">授权</a-button>
              <a-button v-if="!record.readOnly && auth.includes('编辑')" type="primary" size="small" @click="handleUpdate(record)">编辑</a-button>
              <a-button v-if="!record.readOnly && auth.includes('删除')" danger size="small" @click="handleDel(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <!-- 添加 -->
    <RoleEdit ref="editRef" @push-date="pushDate"/>
    <!-- 授权 -->
    <Authorize ref="authorizeRef" />
  </div>
</template>
