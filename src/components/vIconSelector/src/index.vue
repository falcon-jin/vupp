<template>
  <el-button
    :type="props.type" 
    size="default" 
    @click="handleClick"
  >
    <slot>请选择图标</slot>
  </el-button>

  <div class="v-icon-selector__dialog-body--height">
    <el-dialog
      :title="props.title"
      v-model="_dialogVisible"
      @close="handleClose"
    >
      <div class="v-icon-selector__wrapper">
        <div 
          class="v-icon-selector__item" 
          v-for="(item, index) in Object.keys(Icons)" 
          :key="index"
          @click="handleClickIcon(item)"
        >
          <div>
            <!-- 动态组件渲染 -->
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="v-icon-selector__text">{{item}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { useCopy } from '../../../hooks/useCopy/index'
// import { IProps } from './types'
import { toLine } from '../../../utils'

export interface IProps {
  title?: string,
  type?: string
  visible: boolean,
}

// Todo: https://github.com/vuejs/core/issues/4294
const props = withDefaults(defineProps<IProps>(), {
  title: '请选择图标',
  visible: false,
  type: 'primary'    
})

// copy
let _dialogVisible = ref<boolean>(props.visible)
let emits = defineEmits(['update:visible'])

const handleClick = () => {
  _dialogVisible.value = !_dialogVisible.value
  emits('update:visible', !_dialogVisible.value)
}

const handleClose = () => {
  _dialogVisible.value = false
  emits('update:visible', false)
}

const handleClickIcon = (item: string) => {
  let text = `<el-icon-${toLine(item)}/>`
  useCopy(text)
  _dialogVisible.value = false
}
</script>

<style lang='scss' scoped>

.v-icon-selector__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .v-icon-selector__item {
    display: flex;
    width: 25%;  
    height: 70px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .v-icon-selector__text{
    flex: 1;
    font-size: 12px;
  }

  svg {
    width: 1.7rem;
    height: 1.7rem;
  }

}
</style>
