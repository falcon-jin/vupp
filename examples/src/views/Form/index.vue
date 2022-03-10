<template>
<v-form
  ref="form"
  :options="options"
  :label-width="80"
  @on-preview="handleOnPreview"
  @on-remove="handleOnRemove"
  @on-success="handleOnSuccess"
  @on-exceed="handleOnExceed"
  @before-upload="handleBeforeUpload"
>
  <template #uploadArea>
    <el-button size="small">Click to upload</el-button>
  </template>
  <template #uploadTip>
    <div style="color: #ccc; font-size: 12px;">
      jpg/png files with a size less than 500kb
    </div>
  </template>
  <template #action="scope">
    <el-button size="default" @click="submitForm(scope)" type="primary">Submit</el-button>
    <el-button size="default" @click="resetForm">Reset</el-button>
  </template>
</v-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
// import { IFormOptions } from '@/components/vForm/src/types/types'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import { ElMessage, ElMessageBox } from 'element-plus';

interface Scope {
  form: any,
  model: any
}

let form = ref()
let options: any[] = [
  {
    type: 'input',
    value: 'admin',
    label: '用户名',
    prop: 'username', // 验证
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '长度在 2 到 6 个字符',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true,
      
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '长度在 6 到 15 个字符',
        trigger: 'blur'
      }
    ],
    attrs: {
      showPassword: true,
      clearable: true,
      
    }
  },
  {
    type: 'select',
    value: '2', // 默认值
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      },
    ],
    attrs: {
      style: {
        width: '100%'
      },
    } 
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    children: [
      {
        type: 'checkbox',
        label: '篮球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '游泳',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '足球',
        value: '3'
      },
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '未知',
        value: '-'
      },
    ],
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3,
    },
    rules: [
      {
        required: false,
        message: '请上传图片',
        trigger: 'change'
      }
    ],
  },
  {
    type: 'editor',
    value: '这是初始化值',
    prop: 'desc',
    label: '描述',
    // placeholder: '请输入描述内容',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur'
      }
    ]
  }
]

const handleBeforeUpload = (file: any) => {
  console.log('before upload', file);
}
const handleOnPreview = (file: UploadFile) => {
  console.log('on-preview', file)
}
const handleOnRemove = (data: {file: UploadFile, fileList: UploadFile[]}) => {
  ElMessageBox.confirm(`确定删除 ${data.file.name} 吗？`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('on-remove', data.file, data.fileList)
  })
}
const handleOnSuccess = (data: {response: any, file: UploadFile, fileList: UploadFile[]}) => {
  console.log('on-success', data.response, data.file, data.fileList)
}
const handleOnExceed = (data: {files: UploadFile[], uploadFiles: UploadFile[]}) => {
  ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${data.files.length} 个文件，共选择了 ${data.files.length} 个文件`)
  console.log('on-exceed', data.files)
}

const submitForm = (scope: Scope) => {
  scope.form.validate((valid: boolean) => {
    if (valid) {
      console.log(scope.model);
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('提交失败')
    }
  })
}
const resetForm = () => {
  form.value.resetFields()
}
</script>

<style lang='scss' scoped>

</style>
