<template>
<div 
  class="v-model-form__wrapper"
  :class="{ 'v-modal-form__dialog-body--height': scroll }"
>
  <el-dialog
    v-model="_visible"
  >
    <template #default>
      <v-form 
        ref="form" 
        :options="options"
        v-bind="$attrs"
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
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </v-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import IModeFormProps from './types'

const props = defineProps(IModeFormProps)
let emits = defineEmits(['update:visible'])


let form = ref<any>()
let _visible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
  _visible.value = val
})
watch(() => _visible.value, (val) => {
  emits('update:visible', val)
  _visible.value = val
})


</script>

<style lang='scss' scoped>

</style>
