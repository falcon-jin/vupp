<template>
  <div class="v-list__wrapper">
    <el-tabs>
      <el-tab-pane 
         v-for="(item, index) in data"
         :key="index"
         :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <!-- content -->
          <div 
            class="v-list__body" 
            v-for="(itemc, indey) in item.content"
            :key="indey"
            @click="handleClickItem(itemc, indey)"
          >
            <div class="v-list__body--avatar">
              <el-avatar 
                icon="el-icon-user-solid" 
                size="default"
                shape="circle" 
                :src="itemc.avatar" 
                fit="fill"
              />
            </div>
            <div class="v-list__body--content">
              <div v-if="itemc.title" class="v-list__body--content-title">
                <div>{{ itemc.title }}</div>
                <el-tag 
                  v-if="itemc.tag" 
                  size="small" 
                  :type="itemc.tagType"
                >{{ itemc.tag }}</el-tag>
              </div>
              <div v-if="itemc.desc" class="v-list__body--content-desc">{{ itemc.desc }}</div>
              <div v-if="itemc.time" class="v-list__body--content-time">{{ itemc.time }}</div>
            </div>
          </div>
          <!-- action -->
          <div class="v-list__action">
            <div
              class="v-list__action--item"
              :class="{ 'action_border': index !== actions.length - 1 }"
              v-for="(a, index) in actions" 
              :key="index"
              @click="handleClickAction(a, index)" 
            >
              <div v-if="a.icon" class="v-list__action--item-icon">
                <component :is="`el-icon-${toLine(a.icon)}`"></component>
              </div>
              <div class="v-list__action--icon-text">{{ a.text }}</div>
           </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
import { IListProps, IActionProps, IListItemProps } from './types'
import { toLine } from '../../../utils'

// Todos: avatar size
const props = defineProps({
  data: {
    type: Array as PropType<IListProps[]>,
    required: true
  }, 
  actions: {
    type: Array as PropType<IActionProps[]>,
    default: () => [],
    required: false
  },
})
let emits = defineEmits([
  'handleClick',
  'handleAction',
])

const handleClickItem = (item: IListItemProps, index: number) => {
  emits('handleClick', { item, index })
}

const handleClickAction = (action: IActionProps, index: number) => {
  emits('handleAction', { index, action })
}

</script>

<style lang='scss' scoped>
.v-list__body{
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all .2s;

  &:hover {
    background-color: #e6f6ff;
    opacity: 0.9;
  }
  .v-list__body--avatar{
    flex: 1;
    cursor: pointer;
  }
  .v-list__body--content{
    flex: 3;

    .v-list__body--content-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .v-list__body--content-desc{
      color: rgb(128, 128, 128);
    }
    .v-list__body--content-time{
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.v-list__action{
  height: 45px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .v-list__action--item{
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .v-list__action--item-icon{
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
    .v-list__action--icon-text{
      font-size: 12px;
      color: #999;
    }
  }
}

.action_border {
  border-right: 1px solid #eee;
}
</style>
