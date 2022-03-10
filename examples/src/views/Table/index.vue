<template>
<v-table
  :data="tableData"
  :options="options"
  loading
  elementLoadingText="加载中..."
  border
  @saveEdit="saveEdit"
  @cancelEdit="cancelEdit"
  editIcon="Apple"
  :default-sort="{ prop: 'date', order: 'descending' }"
  editRow
  v-model:editRowIndex="editRowIndex"

  pagination
  :currenPage="currentPage"
  :pageSize="pageSize"
  :total="total"
  paginationAlign="center"
  @sizeChange="handleSizeChange"
  @currentChange="handleCurrentChange"
>
  <template #date="{ scope }">
    <!-- <el-icon-timer></el-icon-timer> -->
    {{ scope.row.date }}
  </template>
  <template #name="{ scope }">
  <el-popover
    :width="200"
    trigger="hover"
  >
    <template #reference>
      <el-tag size="small">{{ scope.row.name }}</el-tag>
    </template>
    <template #default>
      {{ scope.row.name }} <br>
      {{ scope.row.address }}
    </template>
  </el-popover>
    
  </template>
  <template #action="{ scope }">
    <el-button @click="edit(scope)" size="small">编辑</el-button>
    <el-button @click="remove(scope)" type="danger" size="small">删除</el-button>
  </template>
  <template #editRow="{ scope }">
    <el-button @click="handleSave(scope)" size="small">保存</el-button>
    <el-button @click="" type="danger" size="small">取消</el-button>
  </template>
  <!-- <template #editCell="{ scope }">
    <div style="display: flex">
      <el-button size="small" @click="customSave(scope)">保存</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </div>
  </template> -->
</v-table>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import axios from 'axios'
// import { ITableOptions } from '@/components/vTable/src/types';

let tableData = ref<any[]>([])
let currentPage = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

onMounted(() => {
  // mock
  fetchData()
})
const fetchData = () => {
  axios.post('/api/list', {
    current: currentPage.value,
    pageSize: pageSize.value
  }).then((res) => {
    tableData.value = res.data.data.rows
    total.value = res.data.data.total
  })
}
// setTimeout(() => {
//   tableData.value = [
//     {
//       date: '2016-05-03',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-02',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-04',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-01',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//   ]
// }, 0)

let options: any[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    width: '150',
    slot: 'date', // custom
    editable: true,
    sortable: true,
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name'
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    action: true,
    slot: 'name' 
  }
]
// 行编辑（表示当前点击编辑按钮触发）
let editRowIndex = ref<string>('')

const edit = (scope: any) => {
  editRowIndex.value = 'edit'
  // console.log(scope.row)
}
const remove = (scope: any) => {
  console.log(scope)
}
const saveEdit = (scope: any) => {
  console.log(scope)
}
const cancelEdit = (scope: any) => {
  console.log(scope)
}
const handleSave = (scope: any) => {
  console.log(scope)
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  fetchData()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchData()
}

</script>

<style lang='scss' scoped>

</style>
