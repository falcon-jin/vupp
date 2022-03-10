<template>
  <el-popover 
    :visible="_visible"
    class="v-city-selector__wrapper"
    placement="bottom-start"
    trigger="click"
    :width="width"
  >
    <!-- 外 -->
    <template #reference>
      <div class="v-city-selector__container" @click="_visible = !_visible">
        <div>{{ _result }}</div>
        <div>
          <el-icon-arrowdown :class="{ 'rotate': _visible }"></el-icon-arrowdown>
        </div>
      </div>
    </template>
    <!-- 内 -->
    <div class="v-city-selector__body">
      <!-- filter -->
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="_selectBy" size="small">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-select 
            v-model="_selectValue" 
            filterable
            :filter-method="handleFilterInput"
            editable
            size="small"
            class="v-city-selector__body-select"
            placeholder="搜索"
            clearable
            @change="handleSelectChange($event)"
          >
            <el-option
              v-for="(item, index) in _options"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-col>
      </el-row>
      <!-- 按城市 -->
      <template v-if="_selectBy === '按城市'">
        <!-- city index -->
        <div class="v-city-selector__city">
          <div 
            class="v-city-selector__city-index item-hover"
            v-for="(item, index) in Object.keys(_allCities)"
            :key="index"
            @click="handleClickIndex(item)"
          >{{ item }}</div>
        </div>
        <!-- city -->
        <el-scrollbar max-height="300px">
          <template 
            v-for="(value, key) in _allCities"
            :key="key"
          >
            <el-row :id="key">
              <el-col :span="2" style="text-align: center; margin-top: 2px;">{{ key }}</el-col>
              <el-col class="v-city-selector__city-name" :span="22">
                <div 
                  class="v-city-selector__city-name-item item-hover"
                  v-for="(item, index) in value" 
                  :key="item.code"
                  @click="handleClickCity(item)"
                >
                  <div>{{item.name}}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <!-- 按省份 -->
      <template v-else>
        <div class="v-city-selector__province">
          <div 
            class="v-city-selector__province-index item-hover"
            v-for="(item, index) in Object.keys(_allProvince)"
            :key="index"
            @click="handleClickIndex(item)"
          >{{ item }}</div>
        </div>
        <el-scrollbar max-height="300px">
          <template 
            v-for="(item, i) in Object.values(_allProvince)"
            :key="i"
          >
          <template v-for="(itemc, indey) in item">
            <el-row :id="itemc.index">
              <el-col :span="3" style="text-align:center; margin-top: 2px;">{{ itemc.name }}</el-col>
              <el-col class="v-city-selector__province-name" :span="21">
                <div 
                  class="v-city-selector__province-name-item item-hover"
                  v-for="(itemcc, indez) in itemc.cities" 
                  :key="indez"
                  @click="handleClickCity(itemcc)"
                >
                  <div>{{itemcc}}</div>
                </div>
              </el-col>
            </el-row>
          </template>
           
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang='ts'>
import { ref, toRefs, onMounted } from 'vue';
import CityProps, { CityItemProps } from './types'
import city from '../lib/cities';
import province from '../lib/province';

const props = defineProps(CityProps)
let emits = defineEmits(['handleClickCity', 'handleSelectCity'])

let _result = ref<string>(props.placeholder);
let _visible = ref<boolean>(false);
let _selectBy = ref<string>('按城市');
let _selectValue = ref<string>('');
let _allCities = ref(city.cities);
let _allCities_plat = ref<CityItemProps[]>([]);
let _allProvince = ref(province);
let _options = ref<CityItemProps[]>([])

const handleClickIndex = (item: string) => {
  // 依靠动态绑定id
  let _el = document.getElementById(item);
  if (_el) {
    _el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

const handleClickCity = (item: any) => {
  _visible.value = false;
  emits('handleClickCity', item)
  if(_selectBy.value === '按城市') {
    _result.value = item.name;
  } else {
    _result.value = item;
  }
}

const handleFilterInput = (val: string) => {
  let _values = Object.values(_allCities.value).flat(2)
  if(val === '') {
    _options.value = _values  
  } else {
    if(_selectBy.value === '按城市') {
      // 中文+拼音过滤
      _options.value = _values.filter(item => {
        return item.name!.includes(val) || item.spell!.includes(val)
      })
    } else {
      // 中文过滤
      _options.value = _values.filter(item => {
        return item.name!.includes(val)
      })
    }
  }
}

const handleSelectChange = (val: Event ) => {
  let _item = _allCities_plat.value.find(item => item.code === (val as any))
  if (_item) {
    _result.value = _item.name!;
    _visible.value = false;
    emits('handleSelectCity', _item)
  }
}

onMounted(() => {
  // 下拉框数据 扁平化处理
  let _values = Object.values(_allCities.value).flat(2)
  _options.value = _values
  _allCities_plat.value = _values
}) 

toRefs(props)
</script>

<style lang='scss' scoped>

.v-city-selector__container {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 3px;
    margin-left: 3px;
    transition: all 0.3s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }
}
.v-city-selector__body{
  padding: 6px;

  &-select {
    margin-top: 1px;
    margin-left: 11px;
  }
  .v-city-selector__city,
  .v-city-selector__province {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;

    &-index {
      min-width: 20px;
      padding: 2px 4px;
      margin-right: 8px;
      margin-bottom: 6px;
      border: 1px solid #ccc;
      text-align: center;
      cursor: pointer;
    }
  }

  .v-city-selector__city-name,
  .v-city-selector__province-name {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 2px 4px;
    margin-bottom: 4px;
    text-align: center;

    &-item {
      margin-right: 6px;
      margin-bottom: 2px;
      cursor: pointer;
      border-radius: 4px;
    }
  }
}
.item-hover:hover {
  background: #f5f5f5; 
  opacity: 0.9; 
}
</style>
