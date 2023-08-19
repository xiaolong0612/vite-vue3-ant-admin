/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 01:35:03
 * @LastEditTime: 2023-08-20 01:59:59
 * @LastEditors: Amber
 */
import {ref} from 'vue'
import dayjs from 'dayjs'

export const useUnix = ()=>{
	const datePickerDate = ref([])
	const rangePickerDate = ref([])
	const getUnix = (date)=>{
		return dayjs(date).unix()
	}
	const formatDate = (params, key)=>{
		if(datePickerDate.value == '') return
		params.value[key] = dayjs(datePickerDate.value).unix()
	}
	const formatArrDate = (params, key)=>{
		if(rangePickerDate.value.length == 0) return
		params.value[key] = [dayjs(rangePickerDate.value[0]).unix(), dayjs(rangePickerDate.value[1]).unix()]
	}
	return{
		datePickerDate,
		rangePickerDate,
		getUnix,
		formatDate,
		formatArrDate
	}
}