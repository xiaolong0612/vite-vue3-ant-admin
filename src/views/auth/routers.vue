<script setup>
import { delRouter } from '@/api/router'
import { onMounted, ref, inject } from 'vue'
import RouterEdit from './components/RouterEdit.vue'
import { usePermissionStore } from '@/stores/permission'

const $msg = inject('message')
const permission = usePermissionStore()
const columns = [
	{
		title: '排序',
		dataIndex: 'meta.sort',
		key: 'sort'
	}, {
		title: '标题',
		dataIndex: 'meta.title',
		key: 'title',
	}, {
		title: '图标',
		dataIndex: 'meta.icon',
		key: 'icon',
		align: 'center'
	}, {
		title: '状态',
		dataIndex: 'hidden',
		key: 'hidden',
		align: 'center'
	}, {
		title: '模板',
		dataIndex: 'componentStr',
		key: 'componentStr',
	}, {
		title: '访问路径',
		dataIndex: 'path',
		key: 'path',
	}, {
		title: '重定向',
		dataIndex: 'redirect',
		key: 'redirect',
	}, {
		title: '操作权限',
		dataIndex: 'meta.auth',
		key: 'auth',
		align: 'center'
	}, {
		title: '操作',
		dataIndex: 'operation',
		align: 'center'
	}
]
const list = ref([])

const editRef = ref(null)

// 获取数据
const fetchData = () => {
	list.value = permission.routes.filter((item, index) => index != permission.routes.length - 1)
}
// 创建
const handleCreate = () => {
	editRef.value.handleCreate()
}
// 编辑
const handleUpdate = (row) => {
	editRef.value.handleUpdate(row)
}
// 更新排序
const handleUpdateSort = (row) => {
	editRef.value.updateField({ meta: { sort: row.meta.sort }, _id: row._id }).then(async () => {
		// await permission.generateRoutes()
	})
}
// 更新状态
const handleUpdateHidden = (row) => {
	const hide = $msg.loading('更新中...', 0)
	editRef.value.updateField({ hidden: !row.hidden, _id: row._id }).then(() => {
		row.hidden = !row.hidden
	}).finally(() => {
		hide()
	})
}
// 单个删除
const handleDel = (row) => {
	delDate([row._id])
}
// 多选删除
// const handleDels = () => {
// const ids = []
// this.multipleSelection.map(item => {
//   ids.push(item._id)
// })
// delDate(ids)
// }
// 删除
const delDate = async (ids) => {
	await delRouter(ids)
	fetchData()
}
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
      <a-table :columns="columns" :data-source="list" :rowKey="record => record._id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'sort'">
            <a-input-number v-model:value="record.meta.sort" :min="0" @blur="handleUpdateSort(record)"/>
          </template>
          <template v-if="column.key === 'title'">
            {{ record.meta.title }}
          </template>
          <template v-if="column.key === 'icon'">
            <icon :type="record.meta.icon" />
          </template>
          <template v-if="column.key === 'hidden'">
            <a-tag v-if="!record.hidden" color="green">启用</a-tag>
            <a-tag v-else color="red">禁用</a-tag>
          </template>
          <template v-if="column.key === 'auth'">
            <a-tag v-for="item in record.meta.auth" :key="item" color="blue">{{ item }}</a-tag>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space warp>
              <a-button v-if="!record.hidden" class="color before:bg-rose-500" size="small" @click="handleUpdateHidden(record)">禁用</a-button>
              <a-button v-else class="color before:bg-green-500" size="small" @click="handleUpdateHidden(record)">启用</a-button>
              <a-button class="color before:bg-blue-500" size="small" @click="handleUpdate(record)">编辑</a-button>
              <a-button danger size="small" @click="handleDel(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <RouterEdit ref="editRef" :routerSource="list" @fetch-data="fetchData" />
  </div>
</template>