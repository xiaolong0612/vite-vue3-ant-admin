/*
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-20 01:35:03
 * @LastEditTime: 2023-08-25 18:31:49
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
	const dateToUnix = (params, key)=>{
		if(datePickerDate.value == '') return
		params.value[key] = dayjs(datePickerDate.value).unix()
	}
	const arrDateToUnix = (params, key)=>{
		if(!rangePickerDate.value || rangePickerDate.value?.length == 0) {
			params.value[key] = []
			return
		}
		params.value[key] = [dayjs(rangePickerDate.value[0]).unix(), dayjs(rangePickerDate.value[1]).unix()]
	}
	const arrDateToDate = (params, key)=>{
		if(!rangePickerDate.value ||rangePickerDate.value?.length == 0) {
			params.value[key] = []
			return
		}
		params.value[key] = [dayjs(rangePickerDate.value[0]), dayjs(rangePickerDate.value[1])]
	}
	return{
		datePickerDate,
		rangePickerDate,
		getUnix,
		dateToUnix,
		arrDateToUnix,
		arrDateToDate
	}
}