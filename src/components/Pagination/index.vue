<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-19 00:21:31
 * @LastEditTime: 2023-08-26 13:22:32
 * @LastEditors: Amber
-->
<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:current', 'update:pageSize', 'pagination', 'onDels'])
const props = defineProps({
	current:{
		type: Number,
		default: 1
	}, 
	pageSize:{
		type: Number,
		default: 10
	}, 
	total:{
		type: Number,
		default: 0
	}, 
	pageSizeOptions: {
		type: Array,
		default() {
			return ['10', '20', '30', '40', '50']
		}
	},
	showTotal: {
		type: Function,
		default: total => `共计 ${total} 条`
	},
	showDel: {
		type: Boolean,
		default: true
	},
	multipleSelection: {
		type: Array,
		default: () => []
	}
})

const currentPage = computed({
	get() {
		return props.current
	},
	set(val) {
		emit('update:current', val)
	}
})

const onShowSizeChange = (current, pageSize) => {
	emit('update:pageSize', pageSize)
	// emit('pagination', {current, pageSize})
}
const onChange = (page, pageSize) => {
	console.log(page, pageSize)
	emit('update:current', page)
	emit('pagination', {page, pageSize})
}
const handleDels = () => {
	emit('onDels')
}
</script>
<template>
  <div class="mt-5 flex justify-between">
    <div>
      <template v-if="showDel">
        <a-popconfirm
          :title="'确定删除这 ' + multipleSelection.length + ' 条数据吗?'"
          @confirm="handleDels"
        >
          <a-button v-show="multipleSelection.length != 0" class="color before:bg-red-500 mr-5" size="small">删除</a-button>
        </a-popconfirm>
        <a-typography-text class="text-blue-500">{{ multipleSelection.length }}</a-typography-text>
        <a-typography-text class="dark:text-zinc-400"> 条已选</a-typography-text>
      </template>
      <slot />
    </div>
    <div>
      <a-pagination
        v-model="currentPage"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        :page-size="pageSize"
        :showTotal="showTotal"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
        >
        <template v-slot:buildOptionText="props" >
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
