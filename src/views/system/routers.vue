<script setup>
import { delRouter } from '@/api/router'
import { ref, inject } from 'vue'
import RouterEdit from './components/RouterEdit.vue'
import { usePermissionStore } from '@/stores/permission'

const whiteRoute = ['控制台', '系统管理', '用户管理', '角色管理', '菜单管理']

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
		title: '路由地址',
		dataIndex: 'path',
		key: 'path',
	}, {
		title: '组件路径',
		dataIndex: 'component',
		key: 'component',
	}, {
		title: '操作权限',
		dataIndex: 'meta.auth',
		key: 'auth',
		align: 'center'
	}, {
		title: '可见',
		dataIndex: 'hidden',
		key: 'hidden',
		align: 'center'
	}, {
		title: '类型',
		dataIndex: 'menuType',
		key: 'menuType',
	}, {
		title: '操作',
		dataIndex: 'operation',
	}
]
const list = ref(permission.routesTable)

const editRef = ref(null)

// 创建
const handleCreate = () => {
	editRef.value.handleCreate()
}
const handleItemAdd = (row) => {
	editRef.value.handleItemAdd(row)
}
// 编辑
const handleUpdate = (row) => {
	editRef.value.handleUpdate(row)
}
// 更新排序
const handleUpdateSort = (row) => {
	editRef.value.updateField({ sort: row.sort, _id: row._id }).then(async () => {
		// await permission.generateRoutes()
	})
}
// 更新状态
const handleUpdateHidden = (row) => {
	const hide = $msg.loading('更新中...', 0)
	editRef.value.updateField({ hidden: !row.hidden, _id: row._id }).then(() => {
		row.hidden = !row.hidden
		// permission.addRoutes.forEach(item => {
		// 	if(item._id == row._id) item.hidden = row.hidden
		// })
		generateRoutes(permission.addRoutes, [row._id], 'update', {hidden: row.hidden})
	}).finally(() => {
		hide()
	})
}
// 单个删除
const handleDel = (row) => {
	delDate([row._id])
}
// 递归静态更新
const generateRoutes = (list, ids, type, params) => {
	list.forEach((item, index) => {
		if(ids.includes(item._id)){
			if(type == 'update'){
				Object.assign(item, params)
			}else{
				delete list[index]
			}
		} else {
			if(item.children && item.children[0]._id){
				generateRoutes(item.children, ids, type, params)
			}
		}
	})
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
	location.reload()
}
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
      <a-table :columns="columns" :data-source="list" :rowKey="record => record._id" size="middle">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'sort'">
            <a-input-number v-model:value="record.sort" :min="0" @blur="handleUpdateSort(record)"/>
          </template>
          <template v-if="column.key === 'title'">
						<icon :type="record.icon" />
            {{ record.title }}
          </template>
          <template v-if="column.key === 'hidden'">
            <a-tag v-if="record.hidden" color="red">否</a-tag>
            <a-tag v-else color="green">是</a-tag>
          </template>
          <template v-if="column.key === 'auth'">
            <a-tag v-for="item in record.auth" :key="item" color="blue">{{ item }}</a-tag>
          </template>
          <template v-if="column.key === 'menuType'">
            <a-tag v-if="record.menuType" color="green">菜单</a-tag>
            <a-tag v-else color="blue">目录</a-tag>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-space warp v-if="!whiteRoute.includes(record.title)">
              <a-button v-if="!record.hidden" class="color before:bg-rose-500" size="small" @click="handleUpdateHidden(record)">禁用</a-button>
              <a-button v-else class="color before:bg-green-500" size="small" @click="handleUpdateHidden(record)">启用</a-button>
              <a-button v-if="record.menuType == 0" class="color before:bg-emerald-400" size="small" @click="handleItemAdd(record)">添加</a-button>
              <a-button class="color before:bg-blue-500" size="small" @click="handleUpdate(record)">编辑</a-button>
              <a-button danger size="small" @click="handleDel(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <RouterEdit ref="editRef" :routerSource="list" />
  </div>
</template>