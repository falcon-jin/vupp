<template>
  <div class="v-area-selector__wrapper">
    <el-select placeholder="省份" v-model="province" clearable>
      <el-option 
        v-for="item in allCities"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select :disabled="!province" placeholder="城市" v-model="city" clearable style="margin: 0 10px;">
      <el-option 
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select :disabled="!province || !city" placeholder="区域" v-model="area" clearable>
      <el-option 
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { IAreaItem, IEmitData } from './types'
import libCity from '../lib/pca-code.json'

let allCities = ref(libCity)
let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')

let selectCity = ref<IAreaItem[]>([])
let selectArea = ref<IAreaItem[]>([])

// 发送数据
let emits = defineEmits(['change'])

// filter cities
watch(() => province.value, val => {
  if (val) {
    selectCity.value = allCities.value.find(item => item.code === province.value)?.children!
  }
  city.value = ''
  area.value = ''
})
// filter areas
watch(() => city.value, val => {
  if (val) {
    selectArea.value = selectCity.value.find((item: { code: string; }) => item.code === city.value)?.children!
  }
  area.value = ''
})
// emit data
watch(() => area.value, val => {
  if(val) {
    let provinceData: IEmitData = {
      code: province.value,
      name: province.value && allCities.value.find(item => item.code === province.value)!.name,
    }
    let cityData: IEmitData = {
      code: city.value,
      name: city.value && selectCity.value.find(item => item.code === city.value)!.name,
    }
    let areaData: IEmitData = {
      code: area.value,
      name: val && selectArea.value.find(item => item.code === val)!.name,
    }
    emits('change', {
      province: provinceData,
      city: cityData,
      area: areaData,
    })  
  }
})
</script>

<style lang='scss' scoped>
.v-area-selector__wrapper {
  .el-select {
    width: 180px;
  }
}
</style>
