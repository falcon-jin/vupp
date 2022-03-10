<template>
<div class="v-form__wrapper">
  <el-form 
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    ref="form"
    :validate-on-rule-change="false"
  > 
    <!-- form items -->
    <template v-for="(item, index) in options" :key="index">
      <!-- 无 children -->
      <el-form-item 
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <!-- 常规表单 -->
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        />
        <!-- upload 表单 -->
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="handleOnPreview"
          :on-remove="handleOnRemove"
          :on-success="handleOnSuccess"
          :on-error="handleOnError"
          :on-progress="handleOnProgress"
          :on-change="handleOnChange"
          :on-exceed="handleOnExceed"
          :before-upload="handleBeforeUpload"
          :before-remove="handleBeforeRemove"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <!-- editor -->
        <div id="vuieditor" v-if="item.type === 'editor'">

        </div>
      </el-form-item>
      <!-- 有 children -->
      <el-form-item 
        v-if="item.children && item.children.length > 0"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <component 
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          />
        </component>
      </el-form-item>
    </template>
    <!-- actions -->
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, nextTick } from 'vue';
import type { UploadFile, ElUploadProgressEvent,  } from 'element-plus/es/components/upload/src/upload.type'
import cloneDeep from 'lodash/cloneDeep'
import E from 'wangeditor'
import IFormProps, { IFormOptions } from './types/types'
import { Awaitable } from '@vueuse/core';

let props = defineProps(IFormProps)
let emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'on-exceed',
  'before-upload',
  'before-remove',
])

let form = ref<any>()
let model = ref<any>(null)
let rules = ref<any>(null)
let edit = ref()

const handleOnPreview = (file: UploadFile): void => {
  emits('on-preview', file)
}
const handleOnRemove = (file: UploadFile, fileList: UploadFile[]): void => {
  emits('on-remove', { file, fileList })
}
const handleOnSuccess = (response: any, file: UploadFile, fileList: UploadFile[]): void => {
  // 表单赋值
  let uploadItem = props.options.find(item => item.type === 'upload')
  if (uploadItem) {
    model.value[uploadItem.prop!] = {
      response, file, fileList
    }
  }
  emits('on-success', { response, file, fileList })
}
const handleOnError = (error: any, file: UploadFile, fileList: UploadFile[]): void => {
  emits('on-error', { error, file, fileList })
}
const handleOnProgress = (evt: ElUploadProgressEvent, file: UploadFile, fileList: UploadFile[]): void => {
  emits('on-progress', { evt, file, fileList })
}
const handleOnChange = (file: UploadFile, fileList: UploadFile[]): void => {
  emits('on-change', { file, fileList })
}
const handleBeforeUpload = (file: any): Awaitable<void | undefined | null | boolean | File | Blob> => {
  return emits('before-upload', file)
}
const handleBeforeRemove = (file: UploadFile, fileList: UploadFile[]): Awaitable<boolean | void> => {
  return emits('before-remove', { file, fileList })
}
const handleOnExceed = (files: File[], uploadFiles: UploadFile[]): void => {
  emits('on-exceed', { files, uploadFiles })
}

const resetFields = (): void => {
  // 重置表单
  form.value!.resetFields()
  // 重置富文本编辑器
  if(props.options && props.options.length) {
    let editorItem = props.options.find(item => item.type === 'editor')
    edit.value.txt.html(editorItem?.value)
  }
}
// for modalForm
const validate = () => {
  // 验证表单
  return form.value.validate
}
// for modalForm
const getFormData = () => {
  return model.value
}

// 分发事件
defineExpose({
  resetFields,
  validate,
  getFormData
})

let initForm = () => {
  if (props.options && props.options.length) {
    let _m: any = {}
    let _r: any = {}
    props.options.map((item: IFormOptions) => {
      _m[item.prop!] = item.value
      _r[item.prop!] = item.rules

      if(item.type === 'editor') {
        nextTick(() => {
          if(document.getElementById("vuieditor")) {
            const editor = new E("#vuieditor")
            editor.config.placeholder = item.placeholder! || '请输入正文'
            editor.create()
            editor.txt.html(item.value) // init value
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
            form.value['editor'] = editor
          }
        })
      }
    })

    model.value = cloneDeep(_m)
    rules.value = cloneDeep(_r)
  }
} 

onMounted(() => {
  initForm()
})

// 监听父组件更新options(如远程数据更新)
watch(() => props.options, (val: IFormOptions[]) => {
  initForm()
}, { deep: true })

</script>

<style lang='scss' scoped>

</style>
