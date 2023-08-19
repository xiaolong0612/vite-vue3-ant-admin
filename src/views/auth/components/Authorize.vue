<script setup>
import { computed, ref, unref } from 'vue'
import { usePermissionStore } from '@/stores/permission'
import { addRoleRoute, getRoleRoute } from '@/api/role'
import { deepClone } from '@/utils'

const permission = usePermissionStore()

const columns = [{
	title: '菜单',
	dataIndex: 'meta.title',
	key: 'title',
}, {
	title: '状态',
	dataIndex: 'hidden',
	key: 'hidden',
	align: 'center'
}, {
	title: '权限',
	dataIndex: 'operation'
}]

const list = ref([])
list.value = permission.routes.filter((item, index) => index != permission.routes.length - 1)
const loading = ref(false)

const dialogVisible = ref(false)
class Temp {
	_id = undefined
	title = ''
}
// 初始表单数据
const tempRef = ref(new Temp())
const roleRoute = ref({})

// 授权弹窗
const handleAuth = (row) => {
	tempRef.value = deepClone(row)
	getRoleRoutes()
	dialogVisible.value = true
	selectedRowKeys.value = []
}
// table选择事件
const selectedRowKeys = ref([])
const checkStrictly = ref(false)
const rowSelection = computed(() => {
	return {
		selectedRowKeys: unref(selectedRowKeys),
		checkStrictly: checkStrictly,
		onChange: changableRowKeys => {
			selectedRowKeys.value = changableRowKeys
		},
		onSelect: (record, selected) => {
			// 全选权限
			if(selected) roleRoute.value[record._id] = record.meta.auth
			else roleRoute.value[record._id] = []
		}
	}
})
const handleAuthItem = (row, item) => {
	const select = roleRoute.value[row._id] && roleRoute.value[row._id].includes(item)
	if (!select) {
		if (!roleRoute.value[row._id]) {
			roleRoute.value[row._id] = []
		}
		roleRoute.value[row._id].push(item)
	} else roleRoute.value[row._id] = roleRoute.value[row._id].filter(auth => auth !== item)
}
// 更新
const updateData = async () => {
	const data = []
	selectedRowKeys.value.map(id => {
		const item = permission.routesSource[id]
		// 添加父级路由访问权限
		let hasAdd = data.filter(d_item => d_item.route_id == item.parent_id)
		if(item.parent_id != '' && hasAdd.length == 0){
			data.push({role: tempRef.value.title, route_id: item.parent_id, auth: []})
		}
		// fix 父级重复添加
		hasAdd = data.filter(d_item => {
			if(d_item.route_id == id) return d_item
		})
		if(hasAdd.length == 0){
			data.push({
				role: tempRef.value.title,
				route_id: item._id,
				auth: roleRoute.value[item._id] || []
			})
		}
	})
	await addRoleRoute(data)
	dialogVisible.value = false
}
// 获取角色权限节点
const getRoleRoutes = () => {
	getRoleRoute({role: tempRef.value.title}, {loading}).then(result => {
		const { list } = result.data
		const routersArr = Object.values(permission.routesSource)
		list.map(item => {
			// 判断子集菜单是否全部选择
			const child = routersArr.filter(r_item => r_item.parent_id == item.route_id)
			const child_ids = child.map(item => item._id)
			const has_child = list.filter(l_item => child_ids.includes(l_item.route_id))
			// 子集全有，则添加
			if(child.length != 0 && has_child.length == child.length) selectedRowKeys.value.push(item.route_id)
			// 没有子集，则添加
			else if (child.length == 0) selectedRowKeys.value.push(item.route_id)
		})
	})
}
const onSubmit = () => {
	updateData()
}
const onCancel = () => {

}
defineExpose({
	handleAuth
})
</script>
<template>
  <a-modal title="授权" v-model:open="dialogVisible" @ok="onSubmit" @cancel="onCancel">
    <a-table :columns="columns" :data-source="list" :rowKey="record => record._id" size="small" :loading="loading" :pagination="false" :row-selection="rowSelection">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          {{ record.meta.title }}
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
            <a-tag v-for="item in record.meta.auth" :key="item" class="cursor-pointer" :color="roleRoute[record._id] && roleRoute[record._id].includes(item) ? 'blue' : ''" @click="handleAuthItem(record, item)">{{ item }}</a-tag>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
