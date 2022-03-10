<template>
<div class="v-table__wrapper">
  <el-table
    :data="_tableData"
    v-loading="_loading"
    :element-loading-text="props.elementLoadingText"
    :element-loading-background="props.elementLoadingBackground"
    :element-loading-spinner="props.elementLoadingSpinner"
    :element-loading-svg="props.elementLoadingSvg"
    :element-loading-svg-view-box="props.elementLoadingSvgViewBox"
    v-bind="$attrs"
    @row-click="rowClick"
  >
    <template 
      v-for="(item, index) in _tableOpts" 
      :key="index"
    >
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
        :sortable="item.sortable"
      >
        <template #default="scope">
          <!-- 无编辑行操作 -->
          <template v-if="!scope.row.isEditRow">
            <!-- 编辑项状态 -->
            <template v-if="(scope.$index + scope.column.id) === _currentEdit">
              <div style="display: flex; align-items: center">
                <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                <div @click.stop="clickEditCell">
                  <!-- 自定义编辑按钮样式 -->
                  <slot name="editCell" v-if="$slots.editCell" :scope="scope"></slot>
                  <!-- 默认编辑样式 -->
                  <div class="v-table__edit-action" v-else>
                    <el-icon-check @click="saveEdit(scope)" class="v-table__edit-action-save"/>
                    <el-icon-close @click="cancelEdit(scope)" class="v-table__edit-action-close"/>
                  </div>
                </div>
              </div>
            </template>
            <!-- 正常显示 -->
            <template v-else>
              <!-- 自定义内容项 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 默认文本内容 -->
              <span v-else >{{ scope.row[item.prop] }}</span>
              <!-- 注意阻止事件冒泡 -->
              <component
                v-if="item.editable"
                :is="`el-icon-${toLine(props.editIcon)}`" 
                class="v-table__edit-icon"
                @click.stop="handleEdit(scope)"
              ></component>
            </template>
          </template>
          <!-- 编辑行操作 -->
          <template v-else>
            <el-input v-model="scope.row[item.prop]" size="small"/>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- action slot -->
    <el-table-column
      v-if="_actionOpts"
      :label="_actionOpts?.label"
      :prop="_actionOpts.prop"
      :align="_actionOpts.align"
      :width="_actionOpts.width"
    >
      <template #default="scope">
        <slot name="editRow" v-if="scope.row.isEditRow" :scope="scope"></slot>
        <slot name="action" v-else :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <div 
    class="v-table__pagination" 
    v-if="props.pagination"
    :style="{ justifyContent: _paginationAlign }"
  >
    <el-pagination
      v-model:currentPage="_currentPage"
      v-model:page-size="_pageSize"
      :page-sizes="props.pageSizes"
      small="small"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, watch } from 'vue'
import ITableProps ,{ ITableOptions } from './types';
import cloneDeep from 'lodash/cloneDeep';
import { toLine } from '../../../utils'

const props = defineProps(ITableProps)
let emits = defineEmits([
  'saveEdit',
  'cancelEdit', 
  'update:editRowIndex',
  'sizeChange',
  'currentChange',
])

// clone props
let _tableData = ref<any[] | undefined>(cloneDeep(props.data))
let _editRowIndex = ref<string | undefined>(props.editRowIndex)

let _currentEdit = ref<string>('') // 当前编辑项唯一标识

// 过滤操作项
let _tableOpts = computed(() => props.options!.filter(item => !item.action))
let _actionOpts = computed(() => props.options!.find(item => item.action))

let _currentPage = ref<number>(props.currentPage)
let _pageSize = ref<number>(props.pageSize)
let _loading = computed(() => props.loading && (!props.data || props.data.length === 0))
let _paginationAlign = computed(() => {
  switch(props.paginationAlign) {
    case 'left':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      break;
  }
})

onMounted(() => {
  init()
})

const handleEdit = (scope: any) => {
  _currentEdit.value = scope.$index + scope.column.id
}
const saveEdit = (scope: any) => {
  emits('saveEdit', scope)
}
const cancelEdit = (scope: any) => {
  emits('cancelEdit', scope)
}
const clickEditCell = () => {
  _currentEdit.value = ''
}
// 点击行 触发事件
const rowClick = (row: any, column: any) => {
  // 判断当前点击项是否为操作项内容
  if(column?.label === _actionOpts.value?.label) {
    // 当前点击按钮是编辑行为
    if(props.editRow && _editRowIndex.value === props.editRowIndex) {
      row.isEditRow = !row.isEditRow
      _tableData.value!.map(item => {
        if(item !== row) item.isEditRow = false
      })
      // 重置按钮标识
      if (!row.isEditRow) {
        emits('update:editRowIndex', '')
      }
    }
  }
} 
// 分页回调
const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
}

const init = () => {
  _tableData.value?.map(item => {
    item.isEditRow = false // 表示当前是否为可编辑行状态
  })
}
// 监听父组件传递的标识
watch(() => props.editRowIndex, (val: string) => {
  if (val) _editRowIndex.value = val
})
// 监听父组件传递表格数据
watch(() => props.data, (val: any) => {
  _tableData.value = cloneDeep(val) 
  init()
}, { deep: true })
</script>

<style lang='scss' scoped>
.v-table__wrapper{
  .v-table__edit-icon{
    position: relative;
    top: 2px;
    left: 4px;
    cursor: pointer;
    color: rgb(167, 167, 167);
  }
  .v-table__edit-action{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    cursor: pointer;
    font-size: 14px;

    &-save {
      color: #409EFF;
      
    }
    &-close {
      margin-left: 4px;
      color: #F56C6C;
    }

    &-save:hover,
    &-close:hover {
      opacity: 0.6;
    }
  }
  .v-table__pagination {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  svg {
    width: 1em;
    height: 1em;
  }
}
</style>
